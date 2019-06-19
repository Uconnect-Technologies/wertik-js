"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DIALECT } = process.env;
exports.default = (DIALECT == "MONGO_DB") ? "_id" : "id";
//# sourceMappingURL=getIdName.js.map