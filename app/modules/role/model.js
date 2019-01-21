import Model from "@framework/model/model.js";
import internalServerError from "@framework/helpers/internalServerError.js";
import {get} from "lodash";

class roleModel extends Model {
	constructor() {
		super({
			tableName: "role"
		});
	}
	async viewRole(_,args) {
		try {
			const id = get(args,'id',null);
			if (id) {
				let findOne =  await this.findOne(id);
				let find = findOne.getInstance();
				if (find) {
					find.statusCode = "OK";
					find.successMessageType = "Success";
					find.successMessage = "Fetched successfully";
					return find;
				}else {
					return {
						statusCode: "NOT_FOUND",
						errorMessageType: "Not found",
						errorMessage: "Role Not found"
					}
				}
			}else {
				return {
					statusCode: "BAD_REQUEST",
					errorMessageType: "Id is required",
					errorMessage: "Id is required to fetch role"
				}
			}
		} catch (e) {
			return internalServerError(e.message);
		}
	}
	async createRole(_,args) {
		try {
			this.instance = null;
			let create = await this.save(args);
			let instance = create.getInstance();
			if (instance) {
				instance.statusCode = "CREATED";
				instance.successMessageType = "Created";
				instance.successMessage = "Permission created successfully";
				return instance;
			}else {
				return internalServerError({message: "Something went wrong"});
			}
		} catch (e) {
			return internalServerError(e.message);
		}
	}
	async updateRole(_, args) {
		try {
			const {id} = args;
			let item =  await this.findOne(id);
			let update = await item.save(args);;
			let updatedItem = update.getInstance();
			updatedItem.successMessageType = "Updated";
			updatedItem.successMessage = "Role updated successfully";
			updatedItem.statusCode = "OK";
			return updatedItem;
		} catch (e) {
			return internalServerError(e);
		}
	}
	async listRole(_, args) {
		try {
			let items = await this.paginate(args);
			return items.list;
		} catch (e) {
			return internalServerError(e);
		}
	}
	async deleteRole(_, args) {
		try {
			const {id} = args;
			let find =  await this.findOne(id);
			let item = find.getInstance();
			if (!item) {
				return {
					statusCode: "NOT_FOUND",
					errorMessageType: "Role deleted",
					errorMessage: "Role deleted already"
				}
			}
			await find.delete();
			return {
				statusCode: "OK",
				successMessageType: "Role deleted",
				successMessage: "Role deleted successfully"
			}
		} catch (e) {
			return internalServerError(e);
		}
	}

}

export default new roleModel;