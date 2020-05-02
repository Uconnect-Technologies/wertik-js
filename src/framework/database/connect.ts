import { successMessage } from "../logger/consoleMessages";
import { IConfiguration } from "../types/configuration";
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
        options = get(configurationObject, "database.dbInitializeOptions", {
          logging: false,
          operatorsAliases: false,
          dialectOptions: {
            ssl: true,
          },
        });
        DATABASE_INSTANCE = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
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

        DATABASE_INSTANCE = require("mongoose");
        const mongoosePaginate = require("mongoose-paginate-v2");
        await DATABASE_INSTANCE.connect(database.mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
        DATABASE_INSTANCE.plugin(mongoosePaginate);

        DATABASE_INSTANCE.connection.on("error", console.error.bind(console, "connection error:"));

        DATABASE_INSTANCE.connection.once("open", function () {
          successMessage(`MongoDB: Database Connected`);
        });
      } else {
        options = get(configurationObject, "database.dbInitializeOptions", {
          logging: false,
          operatorsAliases: false,
          underscored: false,
          freetableName: true,
        });
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
