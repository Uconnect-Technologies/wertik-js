"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./../model/model"));
const helpers_1 = require("../helpers");
const lodash_1 = require("lodash");
function default_1(dbTables, configuration) {
    let modules = helpers_1.loadModulesFromConfiguration(configuration);
    let allTables = Object.keys(dbTables);
    let models = {};
    allTables.forEach((element) => {
        let module = modules.filter((c) => c.name == element);
        models[element] = model_1.default({
            dbTables: dbTables,
            tableName: element,
            configuration: configuration,
            module: lodash_1.get(module, "[0]", {}),
        });
    });
    return models;
}
exports.default = default_1;
//# sourceMappingURL=models.js.map