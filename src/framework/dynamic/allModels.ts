import Model from "./../model/model";
import { models } from "./../database/connection";

let predefinedModules = process.env.predefinedModules.split(",");
let allModels: any = {};

predefinedModules.forEach((moduleName: string, index: any) => {
  if (moduleName !== "auth") {
    allModels[`${moduleName}Model`] = new Model({
      models: models,
      tableName: moduleName
    });
  }
});

export default allModels;
