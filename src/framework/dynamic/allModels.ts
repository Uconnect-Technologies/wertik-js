import Model from "./../model/model";
import {models} from "./../database/connection";
import {join} from "path";

let predefinedModules = process.env.predefinedModules.split(",");
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