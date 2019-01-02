import ForgetPasswordModel from "./model.js";
class ForgetPasswordController {
	async requestPasswordReset(_,args) {
		return await ForgetPasswordModel.requestPasswordReset(_,args);
	}
	async resetPassword(_, args) {
		return await ForgetPasswordModel.resetPassword(_, args)
	}
}

export default new ForgetPasswordController;