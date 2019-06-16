import Model from "./../model/model";
import {models} from "./../database/connection";
import {join} from "path";

let modules = process.env.MODULES_ENABLED.split(",");
let predefinedModules = process.env.PREDEFINED_MODULES.split(",");
let allModels: any = {};

predefinedModules.forEach((moduleName: string, index: any) => {
  if (moduleName !== "auth") {
    allModels[`${moduleName}Model`] = new Model({
      models: models,
      tableName: moduleName.toLowerCase()
    });
  }
});

export default allModels;