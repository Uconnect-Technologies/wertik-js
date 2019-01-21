import Sequelize from "sequelize";
import tableField from "./../../../framework/helpers/tableField.js";
export default {
	tableName: "permission",
	fields: {
		...tableField('user','integer',{allowNull: true}),
		...tableField('action','string',{allowNull: true}),
		...tableField('status','boolean',{allowNull: true}),
		...tableField('role','integer',{allowNull: false}),
		...tableField('created_by','integer',{allowNull: false}),
	}
}