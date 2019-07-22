"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
exports.default = (dialect == "MONGO_DB") ? "_id" : "id";
exports.getIdType = (dialect == "MONGO_DB") ? "String" : "Int";
//# sourceMappingURL=getIdName.js.map