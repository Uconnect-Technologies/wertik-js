let Sequelize = require("sequelize");
import getAppSchemaAsObject from "../../helpers/getAppSchemaAsObject";
import convertAppSchemaToObject from "../../helpers/convertAppSchemaToObject";

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
  CONNECTION.define(element.tableName, element.fields, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });
  if (index == tables.length - 1 && dbMysqlSync) {
    CONNECTION.sync();
  }
});

export let models = CONNECTION.models;
export default CONNECTION;
