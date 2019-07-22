"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getIdName_1 = __importDefault(require("./../helpers/getIdName"));
const getIdName_2 = require("./../helpers/getIdName");
const { dialect } = process.env;
exports.default = {
    generateQueriesSchema(moduleName) {
        return `
      view${moduleName}(${getIdName_1.default}: ${getIdName_2.getIdType}): ${moduleName}
      list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `;
    }
};
//# sourceMappingURL=queries.js.map