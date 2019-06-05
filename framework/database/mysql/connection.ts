import Sequelize from "sequelize";
import getAllSchemasAsObject from "../../helpers/getAllSchemasAsObject";
import generateTables from "./generateTables";

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  MODE
} = process.env;

const DB_PRODUCTION = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  logging: false,
  operatorsAliases: false
});
const DB_DEVELOPMENT = new Sequelize(
  `${DB_NAME}_dev`,
  DB_USERNAME,
  DB_PASSWORD,
  {
    dialect: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    logging: false,
    operatorsAliases: false
  }
);

let CONNECTION = MODE == "development" ? DB_DEVELOPMENT : DB_PRODUCTION;

let f = getAllSchemasAsObject();
let tables = generateTables(f, CONNECTION);
tables.forEach((element: any) => {
  CONNECTION.define(element.tableName, element.fields, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });
});
export let models = CONNECTION.models;
export default CONNECTION;
