import ForgetPasswordSchema from "./schema.js";
import ForgetPasswordController from "./controller.js";
import mutationArgument from "@framework/schema/mutationArgument.js";

const ForgetPasswordMutations = {
	requestPasswordReset: {
		name: "Request password reset",
		description: "Allows user to reset their password",
		type: ForgetPasswordSchema,
		args: {
			...mutationArgument('email','string'),
			...mutationArgument('returnUrl','string'),
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
			...mutationArgument('password','string'),
			...mutationArgument('email','string'),
			...mutationArgument('token','string')
		},
		resolve(_, args) {
			return ForgetPasswordController.resetPassword(_, args);
		}
	}
}

export default ForgetPasswordMutations;