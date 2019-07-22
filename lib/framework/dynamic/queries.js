"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getIdName_1 = __importDefault(require("./../helpers/getIdName"));
const { dialect } = process.env;
console.log(getIdName_1.default);
exports.default = {
    generateQueriesSchema(moduleName) {
        return `
      view${moduleName}(${getIdName_1.default}: ${(dialect == "MONGO_db") ? "String" : "Int"}): ${moduleName}
      list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `;
    }
};
//# sourceMappingURL=queries.js.map