let bcrypt = require("bcrypt-nodejs");
let { ApolloError } = require("apollo-server");

import internalServerError from "./../../../framework/helpers/internalServerError";
import validations from "./validations";
import validate from "./../../../framework/validations/validate";
import statusCodes from "./../../../framework/helpers/statusCodes";
import dynamic from "./../../../framework/dynamic/index";
import { sendEmail } from "./../../../framework/mailer/index";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let { userModel, userRoleModel, profileModel } = allModels;

let userResolver = dynamic.resolvers({
	moduleName: 'User',
	validations: {
		delete: validations.deleteUser,
		update: validations.updateUser,
		view: validations.viewUser
	},
	model: userModel
});

let userDynamic = dynamic.loader("User", userResolver);
let userQueries = userDynamic.queries;
let userMutations = userDynamic.mutations;

export default {
	User: {
		async assignedRoles(user: any) {
			return await relateResolver(userRoleModel, user, 'id', true);
		},
		async profile(user: any) {
			return await relateResolver(profileModel, user, 'profile');
		}
	},
	queries: {
		listUserPermissions: async (_: any, args: any, g: any) => {
			try {
				return [{ action: 'asd' }];
			} catch (e) {
				return internalServerError(e);
			}
		},
		listUser: userQueries.listUser,
		viewUser: userQueries.viewUser
	},
	mutations: {
		changePassword: async (_: any, args: any, g: any) => {
			let v = await validate(validations.changePassword, args);
			if (!v.success) {
				throw new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors })
			}
			try {
				let user = await userModel.view(args);
				if (!user) {
					throw new ApolloError("User not found", statusCodes.BAD_REQUEST.number);
				}
				let correctPassword = bcrypt.compareSync(args.oldPassword, user.password);
				if (!correctPassword) {
					throw new ApolloError("Password incorrect", statusCodes.BAD_REQUEST.number);
				}
				await user.update({
					password: bcrypt.hashSync(args.newPassword)
				});
				await sendEmail('changePassword.hbs', {
					userName: user.email,
					siteName: process.env.NAME,
					email: user.email,
				}, {
						from: process.env.MAILER_SERVICE_USERNAME,
						to: user.email,
						subject: "Password changed"
					});
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
		deleteUser: userMutations.deleteUser,
		updateUser: userMutations.updateUser,
		deleteBulkUser: userMutations.deleteBulkUser,
		updateBulkUser: userMutations.updateBulkUser,
	},
}