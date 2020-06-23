import { get, snakeCase } from "lodash";
import Sequelize from "sequelize";
import moment from "moment";
import { convertFieldsIntoSequelizeFields } from "./helpers/index";
import { errorMessage } from "../logger/consoleMessages";
import { databaseDefaultOptions } from "../defaults/options/index";
import { IConfigurationCustomModule } from "../types/configuration";
import { applyRelationship } from "../moduleRelationships/database";

const checkDatabaseOptions = (moduleName, tableName) => {
  if (moduleName && !tableName) {
    errorMessage(`Module ${moduleName} didn't provided table name. Exiting process.`);
    process.exit();
  }
};

export default function (connection, configuration) {
  let dialect = process.env.dbDialect;
  let modules = process.env.builtinModules.split(",");
  modules = modules.filter((c) => c);
  modules = [...modules, ...get(configuration, "modules", [])];
  let tables = {};
  const processModule = (module) => {
    let moduleName = get(module, "name", "");
    let useDatabase = get(module, "useDatabase", true);

    if (useDatabase) {
      if (dialect == "mysql" || dialect == "postgres") {
        let tableName = get(module, "database.sql.tableName", "");
        checkDatabaseOptions(moduleName, tableName);
        let tableFields = convertFieldsIntoSequelizeFields(module.database.sql.fields);
        let tableOptions = get(module, "database.sql.tableOptions", databaseDefaultOptions.sql.defaultTableOptions);
        tables[moduleName] = connection.define(
          tableName,
          {
            ...tableFields,
            ...databaseDefaultOptions.sql.timestamps,
          },
          {
            ...tableOptions,
            getterMethods: {
              created_at: function () {
                return moment(this.getDataValue("created_at")).format();
              },
              updated_at: function () {
                return moment(this.getDataValue("updated_at")).format();
              },
            },
          }
        );
      } else if (dialect == "mongodb") {
        let mongoose = require("mongoose");
        let tableName = get(module, "database.mongodb.tableName", "");
        let tableOptions = get(module, "database.mongodb.tableOptions", databaseDefaultOptions.mongoDB.defaultTableOptions);
        let tableSchema = get(module, "database.mongodb.schema", null);
        checkDatabaseOptions(moduleName, tableName);
        if (tableSchema && tableName) {
          tables[moduleName] = connection.model(tableName, new mongoose.Schema(tableSchema, tableOptions));
        }
      }
    }
  };
  modules.forEach((element) => {
    let module;
    if (element.constructor === String) {
      module = require(`./../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object) {
      module = element;
    }
    processModule(module);
  });

  // Apply relationships

  modules.forEach((element) => {
    let module;
    if (element.constructor === String) {
      module = require(`./../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object) {
      module = element;
    }
    applyRelationship(module, tables);
  });

  return tables;
}
