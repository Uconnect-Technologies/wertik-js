import Model from "./../model/model.js";
import {models} from "./../database/connection.js";
import {join} from "path";

let modules = process.env.MODULES_ENABLED.split(",");
let allModels = {};

modules.forEach((moduleName, index) => {
  if (moduleName !== "auth") {
    allModels[moduleName] = new Model({
      models: models,
      tableName: moduleName.toLowerCase(moduleName)
    });
  }
});

export default allModels;