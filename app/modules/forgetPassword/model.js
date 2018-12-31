import Sequelize from "sequelize";
class ForgetPasswordModel {
	constructor() {
		this.tableName = "forget_password";
	}
	fields() {
		return {
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
		}
	}
}

export default new ForgetPasswordModel();