"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./../model/model"));
const connection_1 = require("./../database/connection");
let predefinedModules = process.env.predefinedModules.split(",");
let allModels = {};
predefinedModules.forEach((moduleName, index) => {
    if (moduleName !== "auth") {
        allModels[`${moduleName}Model`] = new model_1.default({
            models: connection_1.models,
            tableName: moduleName.toLowerCase()
        });
    }
});
exports.default = allModels;
//# sourceMappingURL=allModels.js.map