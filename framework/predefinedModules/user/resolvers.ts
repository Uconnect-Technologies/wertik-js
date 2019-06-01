import internalServerError from "./../../../framework/helpers/internalServerError";
import bcrypt from "bcrypt-nodejs";
import validations from "./validations";
import validate from "./../../../framework/validations/validate";
import statusCodes from "./../../../framework/helpers/statusCodes";
import {sendEmail} from "./../../../framework/mailer/index";
import {ApolloError} from "apollo-server";
import getIdName from "./../../../framework/helpers/getIdName";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let {userModel,userRoleModel,roleModel,profileModel, userPermissionModel} = allModels;

export default {
	User: {
		async assignedPermissions(user) {
			return await relateResolver(userPermissionModel,user,'id',true);
		},
		async assignedRoles(user) {
			return await relateResolver(userRoleModel,user,'id',true);
		},
		async profile(user) {
			return await relateResolver(profileModel,user,'profile');
		}
	},
	queries: {
		listUser: async (_, args, g) => {
			try {
				let paginate = await userModel.paginate(args);
				return paginate;
			} catch (e) {
				return internalServerError(e);
			}
		},
		viewUser: async (_,args,g) => {
			let v = await validate(validations.viewUser,args,{abortEarly: false});
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