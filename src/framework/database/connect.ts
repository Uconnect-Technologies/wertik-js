import { successMessage } from "../logger/consoleMessages";
import { IConfiguration } from "../types/configuration";
import { databaseDefaultOptions } from "../defaults/options/index";
import { get } from "lodash";

let Sequelize;

export default async function (configurationObject: IConfiguration) {
  return new Promise(async (resolve, reject) => {
    try {
      let DATABASE_INSTANCE;
      let dialect = configurationObject.database.dbDialect;
      if (dialect == "mysql" || dialect == "postgres") {
        Sequelize = require("sequelize");
      }
      let database = configurationObject.database;
      let options;
      if (dialect == "postgres") {
        options = get(configurationObject, "database.dbInitializeOptions", databaseDefaultOptions.postgres.dbInitializeOptions);
        DATABASE_INSTANCE = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
          dialect: "postgres",
          host: database.dbHost,
          port: database.dbPort,
          ...options,
        });
      } else if (dialect === "mysql") {
        options = get(configurationObject, "database.dbInitializeOptions", databaseDefaultOptions.sql.dbInitializeOptions);
        DATABASE_INSTANCE = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
          dialect: "mysql",
          host: database.dbHost,
          port: database.dbPort,
          ...options,
        });
      }
      if (dialect === "mysql" || dialect == "postgres") {
        DATABASE_INSTANCE.authenticate()
          .then(() => {
            successMessage(`SQL: Database Connected`);
          })
          .catch((e) => {
            console.log(e);
            process.exit();
          });
      }

      resolve(DATABASE_INSTANCE);
    } catch (e) {
      reject(e);
    }
  });
}
