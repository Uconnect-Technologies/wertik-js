"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dialect = process.env.dialect;
let db_connect = null;
let db_models = null;
if (dialect == "MYSQL") {
    db_connect = require("./mysql/connection").default;
    db_models = require("./mysql/connection").models;
}
else if (dialect == "MONGO_DB") {
    db_connect = require("./mongodb/connection").default;
    db_models = require("./mongodb/connection").models;
}
exports.default = {
    db_connect
};
exports.models = db_models;
//# sourceMappingURL=connection.js.map