"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let { get } = require('lodash');
let gql = require("graphql-tag");
const path = require('path');
const path_1 = require("path");
const fileExists_1 = __importDefault(require("./fileExists"));
function default_1() {
    var appDir = path.dirname(require.main.filename);
    let f = process.env.MODULES_ENABLED.split(",");
    let predefinedModules = process.env.PREDEFINED_MODULES.split(",");
    let fList = predefinedModules.map((c) => c + "List");
    let object = {};
    predefinedModules.forEach((folder) => {
        let schemaPath = path_1.join(__dirname, "../../framework/predefinedModules", folder, "schema.ts");
        if (fileExists_1.default(schemaPath)) {
            let file = require(schemaPath).default;
            let schema = gql(file);
            let fields = get(schema, 'definitions[0].fields', []);
            let definitions = get(schema, 'definitions[0]', []);
            let name = get(definitions, 'name.value', '');
            if (fields.length == 0) {
                throw `Fields not found for ${folder}`;
            }
            object = Object.assign({}, object, { [name.toLowerCase()]: fields });
        }
    });
    return object;
}
exports.default = default_1;
//# sourceMappingURL=getAllSchemasAsObject.js.map