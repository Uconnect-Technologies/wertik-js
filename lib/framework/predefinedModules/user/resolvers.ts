let bcrypt = require("bcrypt-nodejs");
let {ApolloError} = require("apollo-server");

import internalServerError from "./../../../framework/helpers/internalServerError";
import validations from "./validations";
import validate from "./../../../framework/validations/validate";
import statusCodes from "./../../../framework/helpers/statusCodes";
import {sendEmail} from "./../../../framework/mailer/index";
import getIdName from "./../../../framework/helpers/getIdName";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let {userModel,userRoleModel,roleModel,profileModel, userPermissionModel} = allModels;

export default {
	User: {
		async assignedPermissions(user: any) {
			return await relateResolver(userPermissionModel,user,'id',true);
		},
		async assignedRoles(user: any) {
			return await relateResolver(userRoleModel,user,'id',true);
		},
		async profile(user: any) {
			return await relateResolver(profileModel,user,'profile');
		}
	},
	queries: {
		listUser: async (_: any, args: any, g: any) => {
			try {
				let paginate = await userModel.paginate(args);
				return paginate;
			} catch (e) {
				return internalServerError(e);
			}
		},
		viewUser: async (_: any,args: any,g: any) => {
			let v = await validate(validations.viewUser,args);
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
		changePassword: async (_: any,args: any,g: any) => {
			let v = await validate(validations.changePassword,args);
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
	      },null,null);
				let response: any = {};
				response.statusCode = statusCodes.OK.type;
				response.statusCodeNumber = statusCodes.OK.number;
				response.successMessageType = "Success";
				response.successMessage = "Password changed";
				return response;
			} catch (e) {
				return internalServerError(e);
			}
		},
		deleteUser: async (_: any, args: any, g: any) => {
      let v = await validate(validations.deleteUser,args);
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
		updateUser: async (_: any,args: any,g: any) => {
			let v = await validate(validations.updateUser,args);
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