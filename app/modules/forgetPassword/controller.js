import ForgetPasswordModel from "./model.js";
class ForgetPasswordController {
	async requestPasswordReset(_,args) {
		let response = await ForgetPasswordModel.requestPasswordReset(_,args);
		return {
			email: "Hello"
		}
	}
}

export default new ForgetPasswordController;