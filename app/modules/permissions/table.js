import Sequelize from "sequelize";
import tableField from "./../../../framework/helpers/tableField.js";
export default {
	tableName: "permission",
	fields: {
		...tableField('user','integer',{allowNull: true}),
		...tableField('graphql_query','string',{allowNull: true}),
		...tableField('status','boolean',{allowNull: true}),
		...tableField('created_by','integer',{allowNull: true}),
	}
}