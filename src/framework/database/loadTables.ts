import { get, snakeCase } from "lodash";
import Sequelize from "sequelize";
import moment from "moment";
import { convertFieldsIntoSequelizeFields } from "./helpers/index";
import { errorMessage } from "../logger/consoleMessages";
export default function(connection, configuration) {
  let modules = process.env.builtinModules.split(",");
  modules = modules.filter(c => c);
  modules = [...modules, ...get(configuration, "modules", [])];
  let tables = {};
  const processModule = module => {
    let moduleName = get(module, "name", "");
    let tableName = get(module, "database.sql.tableName", "");
    let useDatabase = get(module, "useDatabase", true);

    if (useDatabase) {
      if (moduleName && !tableName) {
        errorMessage(`Module ${moduleName} didn't provided table name. Exiting process.`);
        process.exit();
      }
      let tableFields = convertFieldsIntoSequelizeFields(module.database.sql.fields);
      let tableOptions = get(module, "database.sql.tableOptions", {
        timestamps: true,
        paranoid: false,
        underscored: false,
        freezeTableName: true
      });
      tables[moduleName] = connection.define(
        tableName,
        {
          ...tableFields,
          created_at: {
            type: Sequelize.DATE,
            get() {
              return moment(this.getDataValue("created_at")).format();
            }
          },
          updated_at: {
            type: Sequelize.DATE,
            get() {
              return moment(this.getDataValue("updated_at")).format();
            }
          }
        },
        {
          ...tableOptions
        }
      );
    }
  };
  modules.forEach(element => {
    let module;
    if (element.constructor === String) {
      module = require(`./../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object) {
      module = element;
    }
    processModule(module);
  });
  connection.sync();
  return tables;
}
