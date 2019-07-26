"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let { get } = require("lodash");
const getSequelizeType_1 = __importDefault(require("../database/mysql/getSequelizeType"));
const restrictColumns = [
    "errors",
    "created_at",
    "id",
    "updated_at",
    "_id",
    "permissions",
    "assignedPermissions",
    "assignedRoles"
];
function default_1(graphqlFields) {
    let keys = Object.keys(graphqlFields);
    let tables = [];
    keys.forEach(element => {
        let fields = graphqlFields[element];
        let table = {
            tableName: element,
            fields: {}
        };
        fields.forEach((fieldElement) => {
            let fieldName = get(fieldElement, "name.value");
            if (restrictColumns.indexOf(fieldName) == -1) {
                let type = "";
                let kind = get(fieldElement, "type.kind");
                if (kind == "NonNullType") {
                    type = get(fieldElement, "type.type.name.value", "");
                }
                else {
                    type = get(fieldElement, "type.name.value", "");
                }
                let field = {
                    [fieldName]: {
                        type: getSequelizeType_1.default(type),
                        allowNull: kind == "NonNullType" ? false : true
                    }
                };
                table.fields = Object.assign({}, table.fields, field);
            }
        });
        tables.push(table);
    });
    return tables;
}
exports.default = default_1;
//# sourceMappingURL=convertAppSchemaToObject.js.map