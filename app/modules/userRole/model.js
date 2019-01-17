import Model from "@framework/model/model.js";

class UserRoleModel extends Model {
	constructor() {
    super({
      tableName: "user_role"
    })
  }
	async createUserRole(_,args) {
		try {
			this.instance = null;
			let create = await this.save(args);
			let instance = create.getInstance();
			if (instance) {
				instance.statusCode = "CREATED";
				instance.successMessageType = "Created";
				instance.successMessage = "User role created successfully";
				return instance;
			}else {
				return internalServerError({message: "Something went wrong"});
			}
		} catch (e) {
			return internalServerError(e);
		}
	}
}

export default new UserRoleModel();