import ForgetPasswordModel from "./model.js";
class ForgetPasswordController {
	requestPasswordReset() {
		let response = ForgetPasswordModel.requestPasswordReset();
		console.log(response);
		return {
			email: "Hello"
		}
	}
}

export default new ForgetPasswordController;