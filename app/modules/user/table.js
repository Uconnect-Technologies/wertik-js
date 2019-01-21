import Sequelize from "sequelize";
import tableField from "./../../../framework/helpers/tableField.js";
export default {
	tableName: "user",
	fields: {
		...tableField('username','string',{allowNull: true}),
		...tableField('accessToken','string',{allowNull: true,unique: false}),
		...tableField('refreshToken','string',{allowNull: false,unique:false}),
		...tableField('isActivated','boolean',{allowNull: false}),
		...tableField('superUser','boolean',{allowNull: false,default: false}),
		...tableField('activationToken','string',{allowNull: true}),
		...tableField('email','string',{allowNull:false,unique: true,isEmail:true}),
		...tableField('password','string',{allowNull:false}),
		...tableField('name','string',{allowNull:true}),
		...tableField('gender','string',{allowNull:true}),
		...tableField('referer','string',{allowNull:true}),
	}
}