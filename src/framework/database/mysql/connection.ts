let Sequelize = require("sequelize");
import getAllSchemasAsObject from "../../helpers/getAllSchemasAsObject";
import generateTables from "./generateTables";

const {
  dbusername,
  dbPassword,
  dbName,
  dbHost,
  dbPort,
  mode
} = process.env;

const DB_PRODUCTION = new Sequelize(dbName, dbusername, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  port: dbPort,
  logging: false,
  operatorsAliases: false
});
const DB_DEVELOPMENT = new Sequelize(
  `${dbName}_dev`,
  dbusername,
  dbPassword,
  {
    dialect: "mysql",
    host: dbHost,
    port: dbPort,
    logging: false,
    operatorsAliases: false
  }
);

let CONNECTION = mode == "development" ? DB_DEVELOPMENT : DB_PRODUCTION;

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
export let syncDatabase = CONNECTION.sync
export default CONNECTION;
