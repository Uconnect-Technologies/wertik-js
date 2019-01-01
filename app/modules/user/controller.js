import UserModel from "./model.js";
class UserController {
	async login(_,args) {
		return await UserModel.login(_,args);
  }
  async signup(_,args) {
    return await UserModel.signup(_,args);
  }
}

export default new UserController;