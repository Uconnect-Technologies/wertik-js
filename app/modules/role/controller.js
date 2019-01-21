import roleModel from "./model.js";

class permissionController {
	async createRole(_, args) {
		return await roleModel.createRole(_,args);
	}	
	async updateRole(_, args) {
		return await roleModel.updateRole(_,args);
	}
	async listRole(_,args) {
		return await roleModel.listRole(_,args);
	}
	async viewRole(_,args) {
		return await roleModel.viewRole(_,args);
	}
	async deleteRole(_,args) {
		return await roleModel.deleteRole(_,args);
	}
}

export default new permissionController;