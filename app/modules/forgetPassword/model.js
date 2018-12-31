import Sequelize from "sequelize";
import Model from "./../../../framework/model/model.js"
class ForgetPasswordModel extends Model {
	constructor() {
		super({tableName: "forget_password"});
		this.tableName = "forget_password";
	}
	rules() {
		return [
			['email',['required']]
		]
	}
	fields() {
		return {
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			token: {
				type: Sequelize.STRING,
				allowNull: true
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			}
		}
	}
}

export default new ForgetPasswordModel();