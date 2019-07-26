"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const primaryKey_1 = __importDefault(require("./../helpers/primaryKey"));
const primaryKey_2 = require("./../helpers/primaryKey");
const { dialect } = process.env;
exports.default = {
    generateQueriesSchema(moduleName) {
        return `
      view${moduleName}(${primaryKey_1.default}: ${primaryKey_2.primaryKeyType}): ${moduleName}
      list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `;
    }
};
//# sourceMappingURL=queries.js.map