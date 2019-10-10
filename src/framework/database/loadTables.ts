
import {get,snakeCase} from "lodash";
import {convertFieldsIntoSequelizeFields} from "./helpers/index";
export default function () {
  let connection = require("./connect").default;
  let modules = process.env.builtinModules.split(",");
  let tables = {};
  const processModule = (module) => {
    let tableName = module.name;
    let useDatabase = get(module,'useDatabase',true);
    if (useDatabase) {
      let tableFields= convertFieldsIntoSequelizeFields(module.fields.sql);
      tables[tableName] = connection.define(snakeCase(tableName),tableFields,{
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true
      });
    }
  }
  //1
  modules.forEach(element => {
    let module = require(`./../builtinModules/${element}/index`).default;
    processModule(module);
  });
  //1
  connection.sync();
  return tables;
}