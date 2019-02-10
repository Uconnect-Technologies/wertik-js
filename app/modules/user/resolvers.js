import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import bcrypt from "bcrypt-nodejs";
import createJwtToken from "./../../../framework/security/createJwtToken.js";
import isTokenExpired from "./../../../framework/security/isTokenExpired.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";
import {sendEmail} from "./../../../framework/mailer/index.js";
import {ApolloError} from "apollo-server";
import getIdName from "./../../../framework/helpers/getIdName.js";

let userModel = new Model({
	models: models,
	tableName: "user"
});

let userRoleModel = new Model({
	models: models,
	tableName: "userrole"
});

let roleModel = new Model({
	models: models,
	tableName: "role"
});


let profileModel = new Model({
	models: models,
	tableName: "profile"
});

let userPermissionModel = new Model({
	models: models,
	tableName: "userpermission"
});

export default {
	User: {
		async assignedPermissions(user) {
			let userPermission = await userPermissionModel.paginate();
			return userPermission;
		},
		async assignedRoles() {
			let userRoles = await userRoleModel.paginate();
			return userRoles;
		},
		async profile(user) {
			return await profileModel.findOne({user: user[getIdName] })
		}
	},
	queries: {
		listUsers: async (_, args, g) => {
			try {
				let paginate = await userModel.paginate(args);
				return paginate;
			} catch (e) {
				return internalServerError(e);
			}
		},
		userView: async (_,args,g) => {
			let v = await validate(validations.userView,args,{abortEarly: false});
			if (!v.success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
			}
			try {
				let user = await userModel.view(args);
				return user;
			} catch (e) {
				return internalServerError(e);
			}
		},
	},
	mutations: {
		loginWithAccessToken: async (_,args,g) => {
			let v = await validate(validations.loginWithAccessToken,args,{abortEarly: false});
			if (!v.success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
			}
			try {
				let user = await userModel.view({accessToken: args.accessToken});
				if (isTokenExpired(user.accessToken)) {
					await user.update({
						accessToken: await createJwtToken({email: user.email,for: "authentication"})
					});
				}
				return user;
			} catch (e) {
				return internalServerError(e);
			}
		},
		twoFactorLogin: async (_, args, g) => {
			let v = await validate(validations.twoFactorLogin,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors});
			}
			try {
				let user = await userModel.findOne({email: args.email});
				if (!user) {
					throw new ApolloError("User Not found",statusCodes.NOT_FOUND.number)
				}
				let twoFactorCode = Math.floor(Math.random() * 100000);
				await user.update({
					twoFactorCode: twoFactorCode
				});
				await sendEmail('twoFactorLogin.hbs',{
	        twoFactorCode: twoFactorCode,
	        siteName: process.env.NAME,
	        userName: user.email
	      },{
	        from: process.env.MAILER_SERVICE_USERNAME,
	        to: args.email,
	        subject: `${process.env.NAME} Two Factor Authorization`
	      });
	      return {
	      	successMessageType: "Success",
	      	successMessage: "Email Sent"
	      }
			} catch (e) {
				return internalServerError(e);
			}
		},
		twoFactorLoginValidate: async (_, args, g) => {
			let v = await validate(validations.twoFactorLoginValidate,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors});
			}
			try {
				let user = await userModel.findOne({twoFactorCode: args.twoFactorCode});
				if (!user) {
					throw new ApolloError("User Not found",statusCodes.NOT_FOUND.number)
				}
				let token = await createJwtToken({email: user.email,for: "authentication"});
				await user.update({
					accessToken: token,
					twoFactorCode: ""
				});
				user.accessToken = token;
				user.successMessage = "Success";
				user.successMessageType = "You are successfully logged in";
				user.statusCode = statusCodes.OK.type;
				user.statusCodeNumber = statusCodes.OK.number;
				return user;
			} catch (e) {
				return internalServerError(e);
			}

		},	
		activateAccount: async (_, args, g) => {
			let v = await validate(validations.activateAccount,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors});
			}
			try {
				let user = await userModel.findOne({activationToken: args.activationToken});
				if (!user) {
					throw new ApolloError("Not found",statusCodes.NOT_FOUND.number);
				}
				await user.update({
					activationToken: "",
					isActivated: true,
					activatedOn: moment().valueOf()
				});
				await sendEmail('accountActivated.hbs',{
	        username: user.email,
	        siteName: process.env.NAME,
	      },{
	        from: process.env.MAILER_SERVICE_USERNAME,
	        to: user.email,
	        subject: `Welcome to ${process.env.NAME}`
	      });
				return {
					statusCode: statusCodes.OK.type,
					statusCodeNumber: statusCodes.OK.number,
					successMessage: "Success",
					successMessageType: "Account successfully isActivated"
				}
			} catch (e) {
				return internalServerError(e);
			}
		},
		login: async (_,args,g) => {
			let v = await validate(validations.login,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors});
			}
			try {
				let { email, password } = args;
				let user = await userModel.findOne({email: email});
				let findEmail = get(user,'email',null);
				if (!findEmail) {
					throw new ApolloError("Not found",statusCodes.NOT_FOUND.number)
				}	
				let comparePassword = bcrypt.compareSync(password, user.password);
				if (!comparePassword) {
					throw new ApolloError("Incorrect Password",statusCodes.BAD_REQUEST.number)
				}
				let token = await createJwtToken({email: email,for: "authentication"});
				await user.update({
					accessToken: token
				});
				user.accessToken = token;
				user.successMessage = "Success";
				user.successMessageType = "You are successfully logged in";
				user.statusCode = statusCodes.OK.type;
				user.statusCodeNumber = statusCodes.OK.number;
				return user;
			} catch (e) {
				return internalServerError(e);
			}
		},
		signup: async (_,args,g) => {
			let v = await validate(validations.signup,args,{abortEarly: false});
			if (!v.success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
			}
			try {
				let { email, password, confirmPassword } = args;
	      let user = await userModel.findOne({
					email: email
				});
				if (user) throw new ApolloError("Email is already used",statusCodes.BAD_REQUEST.number)
				var hash = bcrypt.hashSync(password);
				let newUser = await userModel.create({
					email: email,
					referer: get(args,'referer',''),
					superUser: false,
					name: get(args,'name',''),
					accessToken: await createJwtToken({email: email,for: "authentication"}),
					refreshToken: await createJwtToken({email: email,for: "refreshToken"}),
					isActivated: false,
					isSuperUser: get(args,'isSuperUser',false),
					activationToken: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
					password: hash
				});
				await sendEmail('welcome.hbs',{
	        email: newUser.email,
	        username: newUser.email,
	        date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
	        siteName: process.env.NAME,
	        activationUrl: `${process.env.FRONTEND_APP_URL}/activate-account/`,
	        activationToken: newUser.activationToken,
	      },{
	        from: process.env.MAILER_SERVICE_USERNAME,
	        to: newUser.email,
	        subject: `Welcome to ${process.env.NAME}`
	      });
	      await profileModel.create({
	      	description: '...',
	      	user: newUser[getIdName],
	      });
				newUser.statusCode = statusCodes.OK.type;
				newUser.statusCodeNumber = statusCodes.OK.number;
				newUser.successMessageType = "Registered";
				newUser.successMessage = "New user successfully created";
				return newUser;
			} catch (e) {
				return internalServerError(e);
			}
		},
		refreshToken:  async (_,args,g) => {
			let v = await validate(validations.refreshToken,args,{abortEarly: false});
			if (!v.success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
			}
			try {
				let user = await userModel.findOne({
					refreshToken: args.refreshToken
				});
				if (!user) {
					throw new ApolloError("Refresh Token is Incorrect, please login again.",statusCodes.BAD_REQUEST.number)
				}

				let token = await createJwtToken({email: user.email,for: "authentication"});
				await user.update({
					accessToken: token
				});
				user.statusCode = statusCodes.OK.type;
				user.statusCodeNumber = statusCodes.OK.number;
				user.successMessageType = "Success";
				user.successMessage = "Access token refreshed";
				return user;
			} catch (e) {
				return internalServerError(e);
			}
		},
		changePassword: async (_,args,g) => {
			let v = await validate(validations.changePassword,args,{abortEarly: false});
			if (!v.success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
			}
			try {
				let user = await userModel.view(args);
				if (!user) {
					throw new ApolloError("User not found",statusCodes.BAD_REQUEST.number);
				}
				let correctPassword = bcrypt.compareSync(args.oldPassword, user.password);
				if (!correctPassword) {
					throw new ApolloError("Password incorrect",statusCodes.BAD_REQUEST.number);
				}
				await user.update({
					password: bcrypt.hashSync(args.newPassword)
				});
				await sendEmail('changePassword.hbs',{
	        userName: user.email,
	        siteName: process.env.NAME,
	        email: user.email,
	      },{
	        from: process.env.MAILER_SERVICE_USERNAME,
	        to: user.email,
	        subject: "Password changed"
	      });
				let response = {};
				response.statusCode = statusCodes.OK.type;
				response.statusCodeNumber = statusCodes.OK.number;
				response.successMessageType = "Success";
				response.successMessage = "Password changed";
				return response;
			} catch (e) {
				return internalServerError(e);
			}
		},
		deleteUser: async (_, args, g) => {
      let v = await validate(validations.deleteUser,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        return await userModel.delete(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
		updateUser: async (_,args,g) => {
			let v = await validate(validations.updateUser,args,{abortEarly: false});
			if (!v.success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
			}
			try {
				let user = await userModel.findOne({[getIdName]: args[getIdName]});
				if (!user) {
					throw new ApolloError("User not found",statusCodes.NOT_FOUND.number)
				}
				return await user.update(args);
			} catch (e) {
				return internalServerError(e);
			}
		},
	},

}