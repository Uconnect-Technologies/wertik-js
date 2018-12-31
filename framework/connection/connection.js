import Sequelize from "sequelize";
import loadAllModels from "./../helpers/loadAllModels.js";

const {
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
	DB_HOST,
	DB_PORT,
	MODE
} = process.env;

const DB_PRODUCTION = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
	dialect: 'mysql',
	host: DB_HOST,
	port: DB_PORT,
	logging: false,
	operatorsAliases: false
});
const DB_DEVELOPMENT =  new Sequelize(`${DB_NAME}_dev`,DB_USERNAME,DB_PASSWORD,{
	dialect: 'mysql',
	host: DB_HOST,
	port: DB_PORT,
	logging: false,
	operatorsAliases: false
});

let CONNECTION = (MODE == 'development') ? DB_DEVELOPMENT : DB_PRODUCTION;



export let init = function ()  {
	let models = loadAllModels();
	models.map((model) => {
		let tableName = model.tableName;
		let fields = model.fields;
		CONNECTION.define(tableName,fields,{
			paranoid: true,
			underscored: true,
			freezeTableName: true,
		})
	});
	CONNECTION.sync({
		force: true
	})
	return CONNECTION;
}

export default CONNECTION;