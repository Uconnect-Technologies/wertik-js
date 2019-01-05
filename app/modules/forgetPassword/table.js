import Sequelize from "sequelize";
import tableField from "./../../../framework/helpers/tableField.js";

export default {
	tableName: "forget_password",
	fields: {
		...tableField('email','string',{allowNull: false}),
		...tableField('token','string',{allowNull: true}),
		...tableField('status','boolean',{allowNull: true}),
	}
}