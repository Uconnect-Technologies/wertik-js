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
	port: DB_PORT
});
const DB_DEVELOPMENT =  new Sequelize(`${DB_NAME}_dev`,DB_USERNAME,DB_PASSWORD,{
	dialect: 'mysql',
	host: DB_HOST,
	port: DB_PORT
});

let CONNECTION = (MODE == 'development') ? DB_DEVELOPMENT : DB_PRODUCTION;

loadAllModels();

export default CONNECTION;