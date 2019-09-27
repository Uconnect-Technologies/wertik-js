
import {convertFieldsIntoSequelizeFields} from "./helpers/index";
export default function () {
  let connection = require("./connect").default;
  let modules = process.env.builtinModules.split(",");
  let tables = {};
  modules.forEach(element => {
    let module = require(`./../builtinModules/${element}/index`).default;
    let tableName = module.name;
    let tableFields= convertFieldsIntoSequelizeFields(module.fields.sql);
    tables[tableName] = connection.define(tableName,tableFields);
  });
  connection.sync();
  return tables;
}