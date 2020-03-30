import { successMessage } from "../logger/consoleMessages";
import { IConfiguration } from "../types/configuration";
import { get } from "lodash";

let Sequelize = require("sequelize");
export default function(configurationObject: IConfiguration) {
  let DB_PRODUCTION;
  let dialect = configurationObject.database.dbDialect;
  let database = configurationObject.database;
  let options;
  if (dialect == "postgres") {
    options = get(configurationObject, "database.dbInitializeOptions", {
      logging: false,
      operatorsAliases: false,
      dialectOptions: {
        ssl: true
      }
    });
    DB_PRODUCTION = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
      dialect: "postgres",
      host: database.dbHost,
      port: database.dbPort,
      ...options
    });
  } else {
    options = get(configurationObject, "database.dbInitializeOptions", {
      logging: false,
      operatorsAliases: false,
      underscored: false,
      freetableName: true
    });
    DB_PRODUCTION = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
      dialect: "mysql",
      host: database.dbHost,
      port: database.dbPort,
      ...options
    });
  }
  DB_PRODUCTION.authenticate()
    .then(() => {
      successMessage(`Database Connected`);
    })
    .catch(e => {
      console.log(e);
      process.exit();
    });
  return DB_PRODUCTION;
}
