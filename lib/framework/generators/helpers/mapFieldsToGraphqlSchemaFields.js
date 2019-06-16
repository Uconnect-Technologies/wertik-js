"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let { has } = require("lodash");
const fieldTypes_1 = __importDefault(require("./fieldTypes"));
let fieldTypes = fieldTypes_1.default;
function default_1(data) {
    let string = "";
    let split = data.split(" ");
    let addedColumns = [];
    split.forEach((data) => {
        let splitColon = data.split(":");
        let [columnName, columnType] = splitColon;
        let hasProperty = has(fieldTypes, columnType);
        if (addedColumns.indexOf(columnName) > -1) {
            return;
        }
        if (hasProperty) {
            addedColumns.push(splitColon[0]);
            string = string + `${columnName}: ${fieldTypes[columnType]}
			`;
        }
        else {
            console.log(`${splitColon[1]} is not a type, Skipping, Please add it manually.`);
        }
    });
    return string;
}
exports.default = default_1;
//# sourceMappingURL=mapFieldsToGraphqlSchemaFields.js.map