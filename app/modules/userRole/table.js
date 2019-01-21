import Sequelize from "sequelize";
import tableField from "./../../../framework/helpers/tableField.js";
export default {
	tableName: "user_role",
	fields: {
		...tableField('user','number',{allowNull: true}),
		...tableField('role','number',{allowNull: true}),
		...tableField('status','boolean',{allowNull: true}),
		...tableField('created_by','integer',{allowNull: true}),
	}
}