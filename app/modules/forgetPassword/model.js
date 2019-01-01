import Sequelize from "sequelize";
import Model from "./../../../framework/model/model.js";
class ForgetPasswordModel extends Model {
	constructor() {
		super({
			tableName: "forget_password"
		});
	}
	requestPasswordReset() {
		return {
			email: "123123"
		}
	}
}

export default new ForgetPasswordModel();