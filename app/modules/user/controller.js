import UserModel from "./model.js";
class UserController {
	async login(_,args) {
		return await UserModel.login(_,args);
  }
  async signup(_,args) {
    return await UserModel.signup(_, args);
  }
  async user(_, args) {
    return await UserModel.user(_,args);
  }
  async activateAccount(_,args) {
  	return await UserModel.activateAccount(_, args);
  }
  async changePassword(_, args) {
    return await UserModel.changePassword(_, args);
  }
  async refreshToken(_,args) {
  	return await UserModel.refreshToken(_, args);
  }
  async updateProfile(_,args) {
    return await UserModel.updateProfile(_,args);
  }
}

export default new UserController;