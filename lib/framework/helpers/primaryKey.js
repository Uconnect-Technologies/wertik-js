"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
exports.default = (dialect == "MONGO_DB") ? "_id" : "id";
exports.primaryKeyType = (dialect == "MONGO_DB") ? "String" : "Int";
//# sourceMappingURL=primaryKey.js.map