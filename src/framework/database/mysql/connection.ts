let Sequelize = require("sequelize");
import getAppSchemaAsObject from "../../helpers/getAppSchemaAsObject";
import convertAppSchemaToObject from "../../helpers/convertAppSchemaToObject";
import camelToSnake from "./../../helpers/camelToSnake";

const { dbusername, dbPassword, dbName, dbHost, dbPort, mode, dbMysqlSync } = process.env;

const DB_PRODUCTION = new Sequelize(dbName, dbusername, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  port: dbPort,
  logging: false,
  operatorsAliases: false
});

const DB_DEVELOPMENT = new Sequelize(`${dbName}_dev`, dbusername, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  port: dbPort,
  logging: false,
  operatorsAliases: false
});

let CONNECTION = mode == "development" ? DB_DEVELOPMENT : DB_PRODUCTION;

let tables = convertAppSchemaToObject(getAppSchemaAsObject());

tables.forEach((element: any, index: any) => {
  // Create MYSQl table and convert the string into snake from camel case
  CONNECTION.define(element.tableName, element.fields, {
    paranoid: true,
    freezeTableName: true,
    underscored: true,
    timestamps: true
  });
  if (index == tables.length - 1 && dbMysqlSync) {
    CONNECTION.sync();
  }
});

export default CONNECTION;
export let models = CONNECTION.models;
export let modelsWithSchema = tables;
