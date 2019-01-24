import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import bcrypt from "bcrypt-nodejs";
import createJwtToken from "./../../../framework/security/createJwtToken.js";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";

let userModel = new Model({
	models: models,
	tableName: "user"
});

export default {
	activateAccount: (_,args) => {
		try {
			return {name: "Ilyas"}
		} catch (e) {
			return internalServerError(e);
		}
	},
	login: async (args,req,schema) => {
		try {
			let v = await validate(validations.login,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			let { email, password } = args;
			let user = await userModel.findOne({email: email});
			let findEmail = get(user,'email',null);
			if (!findEmail) {
				return {
					statusCode: statusCodes.BAD_REQUEST.type,
					errors: ["User: user not found"],
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}	
			let comparePassword = bcrypt.compareSync(password, user.password);
			if (!comparePassword) {
				return {
					statusCode: statusCodes.BAD_REQUEST.type,
					errors: ["Password: Incorrect Password"],
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
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
	signup: async (args,req,schema) => {
		try {
			let v = await validate(validations.signup,args,{abortEarly: false});
			if (!v.success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			let { email, password, confirmPassword } = args;
      let user = await userModel.findOne({
				email: email
			});
			if (user) throw new Error('Email: Email is already used');
			var hash = bcrypt.hashSync(password);
			let newUser = await userModel.create({
				email: email,
				superUser: false,
				accessToken: await createJwtToken({email: email,for: "authentication"}),
				refreshToken: await createJwtToken({email: email,for: "refreshToken"}),
				isActivated: false,
				activationToken: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
				password: hash
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
	refreshToken:  async (args,req,schema) => {
		try {
			let v = await validate(validations.refreshToken,args,{abortEarly: false});
			if (!v.success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			let user = await userModel.findOne({
				refreshToken: args.refreshToken
			});
			if (!user) {
				return {
					errors: ["refreshToken: Refresh token is Incorrect"],
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
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
	userView: async (args,req,schema) => {
		try {
			let v = await validate(validations.userView,args,{abortEarly: false});
			if (!v.success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			let user = await userModel.view(args);
			return user;
		} catch (e) {
			return internalServerError(e);
		}
	},
	changePassword: async (args,req,schema) => {
		try {
			let v = await validate(validations.changePassword,args,{abortEarly: false});
			if (!v.success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			let user = await userModel.view(args);
			if (!user) {
				return {
					statusCode: statusCodes.BAD_REQUEST.type,
					errors: ["User: User not found"],
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			let correctPassword = bcrypt.compareSync(args.oldPassword, user.password);
			if (!correctPassword) {
				return {
					statusCode: statusCodes.BAD_REQUEST.type,
					errors: ["Password: Password Incorrect"],
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			await user.update({
				password: bcrypt.hashSync(args.newPassword)
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
	updateProfile: async (args,req,schema) => {
		try {
			let v = await validate(validations.updateProfile,args,{abortEarly: false});
			if (!v.success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			let user = await userModel.findOneByID(args.userID);
			if (!user) {
				return {
					statusCode: statusCodes.BAD_REQUEST.type,
					errors: ["User: User not found"],
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
			}
			user.update(args);
			let response = {...args};
			response.statusCode = statusCodes.OK.type;
			response.statusCodeNumber = statusCodes.OK.number;
			response.successMessageType = "Success";
			response.successMessage = "Account updated";
			return response;
		} catch (e) {
			return internalServerError(e);
		}
	},
}