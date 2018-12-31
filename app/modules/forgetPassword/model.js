import Sequelize from "sequelize";
class ForgetPasswordModel {
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