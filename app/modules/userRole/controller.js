import userRoleModel from "./model.js";
class userRoleController {
	async createUserRole(_,args) {
		return userRoleModel.createUserRole(_,args);
	}
}

export default new userRoleController;