import Sequelize from "sequelize";
export default {
	tableName: "forget_password",
	fields: {
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