"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let { get, camelCase } = require("lodash");
let gql = require("graphql-tag");
const path_1 = require("path");
const fileExists_1 = __importDefault(require("./fileExists"));
function default_1() {
    let predefinedModules = process.env.predefinedModules.split(",");
    let object = {};
    predefinedModules.forEach(folder => {
        let schemaPath = path_1.join(__dirname, "../../framework/predefinedModules", folder, "schema.js");
        if (fileExists_1.default(schemaPath)) {
            let file = require(schemaPath).default;
            let schema = gql(file);
            let fields = get(schema, "definitions[0].fields", []);
            let definitions = get(schema, "definitions[0]", []);
            let name = get(definitions, "name.value", "");
            if (fields.length == 0) {
                throw `Fields not found for ${folder}`;
            }
            object = Object.assign({}, object, { [camelCase(name)]: fields });
        }
    });
    return object;
}
exports.default = default_1;
//# sourceMappingURL=getAppSchemaAsObject.js.map