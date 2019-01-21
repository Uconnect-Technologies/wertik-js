import permissionModel from "./model.js";

class PermissionController {
	async createPermission(_,args) {
		return permissionModel.createPermission(_,args);
	}
	async updatePermission(_,args) {
		return permissionModel.updatePermission(_,args);
	}
	async listPermission(_,args) {
		return permissionModel.listPermission(_,args);
	}
	async viewPermission(_,args) {
		return permissionModel.viewPermission(_,args);
	}
	async deletePermission(_,args) {
		return permissionModel.deletePermission(_,args);
	}
}

export default new PermissionController;