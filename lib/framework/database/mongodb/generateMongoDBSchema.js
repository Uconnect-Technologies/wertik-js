"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let { get } = require("lodash");
const getMongoDBSchemaType_1 = __importDefault(require("./getMongoDBSchemaType"));
const restrictColumns = [
    "errors", "successMessage", "successMessageType", "statusCode", "statusCodeNumber", "created_at", "id", "updated_at",
];
function default_1(mongoose, schemas) {
    let tables = Object.keys(schemas);
    let object = {};
    tables.forEach((table) => {
        let tableColumnsArray = schemas[table];
        let tableColumns = {};
        tableColumnsArray.forEach((tableColumn) => {
            let tableColumnName = get(tableColumn, 'name.value');
            if (restrictColumns.indexOf(tableColumn) == -1) {
                let type = "";
                let kind = get(tableColumn, 'type.kind');
                if (kind == "NonNullType") {
                    type = get(tableColumn, 'type.type.name.value', '');
                }
                else {
                    type = get(tableColumn, 'type.name.value', '');
                }
                if (type) {
                    type = getMongoDBSchemaType_1.default(type);
                    tableColumns[tableColumnName] = type;
                }
            }
        });
        object[table] = tableColumns;
    });
    return object;
}
exports.default = default_1;
//# sourceMappingURL=generateMongoDBSchema.js.map