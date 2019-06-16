"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dialect = process.env.DIALECT;
let db_connect = null;
let db_models = null;
if (dialect == "MYSQL") {
    db_connect = require("./mysql/connection.ts").default;
    db_models = require("./mysql/connection.ts").models;
}
else if (dialect == "MONGO_DB") {
    db_connect = require("./mongodb/connection.ts").default;
    db_models = require("./mongodb/connection.ts").models;
}
exports.default = {
    db_connect
};
exports.models = db_models;
//# sourceMappingURL=connection.js.map