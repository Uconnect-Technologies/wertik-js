import ForgetPasswordSchema from "./schema.js";
import ForgetPasswordController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

export default {
	requestPasswordReset: {
		name: "Request password reset",
		description: "Allows user to reset their password",
		type: ForgetPasswordSchema,
		args: {
			...queryMutationArgument('email','string'),
			...queryMutationArgument('returnUrl','string'),
		},
		async resolve(_,args) {
			return await ForgetPasswordController.requestPasswordReset(_,args);
		}
	},
	resetPassword: {
		type: ForgetPasswordSchema,
		name: "Reset password",
		description: "Allows you to reset your password",
		args: {
			...queryMutationArgument('password','string'),
			...queryMutationArgument('email','string'),
			...queryMutationArgument('token','string')
		},
		resolve(_, args) {
			return ForgetPasswordController.resetPassword(_, args);
		}
	}
}