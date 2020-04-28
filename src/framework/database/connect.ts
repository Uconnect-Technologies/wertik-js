import { successMessage } from "../logger/consoleMessages";
import { IConfiguration } from "../types/configuration";
import { get } from "lodash";

let Sequelize = require("sequelize");
export default function (configurationObject: IConfiguration) {
  let DB_PRODUCTION;
  let dialect = configurationObject.database.dbDialect;
  let database = configurationObject.database;
  let options;
  if (dialect == "postgres") {
    options = get(configurationObject, "database.dbInitializeOptions", {
      logging: false,
      operatorsAliases: false,
      dialectOptions: {
        ssl: true,
      },
    });
    DB_PRODUCTION = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
      dialect: "postgres",
      host: database.dbHost,
      port: database.dbPort,
      ...options,
    });
  } else if (dialect == "mongodb") {
    // Steps to make mongo DB complete

    // 1. Create initializer. [In Progrss] [connect.ts]
    // 2. Import modules and setup mongodb models from them [To do] [loadTables]
    // 3. Create wertik model.ts function [To do] [src/framework/model/model.ts]

    const mongoose = require("mongoose");
    mongoose.connect(database.mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
  } else {
    options = get(configurationObject, "database.dbInitializeOptions", {
      logging: false,
      operatorsAliases: false,
      underscored: false,
      freetableName: true,
    });
    DB_PRODUCTION = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
      dialect: "mysql",
      host: database.dbHost,
      port: database.dbPort,
      ...options,
    });
  }
  if (dialect === "mysql" || dialect == "postgres") {
    DB_PRODUCTION.authenticate()
      .then(() => {
        successMessage(`Database Connected`);
      })
      .catch((e) => {
        console.log(e);
        process.exit();
      });
  }

  return DB_PRODUCTION;
}
