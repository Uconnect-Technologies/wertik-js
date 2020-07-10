import Model from "./../model/model";
import { IConfiguration } from "../types/configuration";
import { loadModulesFromConfiguration } from "../helpers";
import { get } from "lodash";

export default function (dbTables, configuration: IConfiguration) {
  let modules = loadModulesFromConfiguration(configuration);
  let allTables = Object.keys(dbTables);
  let models = {};
  allTables.forEach((element) => {
    let module = modules.filter((c) => c.name == element);
    models[element] = Model({
      dbTables: dbTables,
      tableName: element,
      configuration: configuration,
      module: get(module, "[0]", {}),
    });
  });
  return models;
}
