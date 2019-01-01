import Sequelize from "sequelize";
export default {
	tableName: "user",
	fields: {
		username: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		token: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: false,
		},
		isActivated: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		},
		activationToken: {
			type: Sequelize.STRING,
			allowNull: true
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true,
			isEmail: true,
		},
		gender: {
			type: Sequelize.STRING,
			allowNull: true
		},
		referer: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}
}