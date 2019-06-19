"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./../../../framework/dynamic/index"));
exports.default = `
  ${index_1.default.queries.generateQueriesSchema("RolePermission")}
`;
//# sourceMappingURL=query.js.map