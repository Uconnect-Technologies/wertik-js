"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let Sequelize = require("sequelize");
const getAllSchemasAsObject_1 = __importDefault(require("../../helpers/getAllSchemasAsObject"));
const generateTables_1 = __importDefault(require("./generateTables"));
const { dbusername, dbPassword, dbName, dbHost, dbPort, mode } = process.env;
const DB_PRODUCTION = new Sequelize(dbName, dbusername, dbPassword, {
    dialect: "mysql",
    host: dbHost,
    port: dbPort,
    logging: false,
    operatorsAliases: false
});
const DB_DEVELOPMENT = new Sequelize(`${dbName}_dev`, dbusername, dbPassword, {
    dialect: "mysql",
    host: dbHost,
    port: dbPort,
    logging: false,
    operatorsAliases: false
});
let CONNECTION = mode == "development" ? DB_DEVELOPMENT : DB_PRODUCTION;
let f = getAllSchemasAsObject_1.default();
let tables = generateTables_1.default(f, CONNECTION);
tables.forEach((element) => {
    CONNECTION.define(element.tableName, element.fields, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
});
exports.models = CONNECTION.models;
exports.syncDatabase = CONNECTION.sync;
exports.default = CONNECTION;
//# sourceMappingURL=connection.js.map