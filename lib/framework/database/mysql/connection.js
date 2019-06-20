"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let Sequelize = require("sequelize");
const getAllSchemasAsObject_1 = __importDefault(require("../../helpers/getAllSchemasAsObject"));
const generateTables_1 = __importDefault(require("./generateTables"));
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, MODE } = process.env;
const DB_PRODUCTION = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    logging: false,
    operatorsAliases: false
});
const DB_DEVELOPMENT = new Sequelize(`${DB_NAME}_dev`, DB_USERNAME, DB_PASSWORD, {
    dialect: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    logging: false,
    operatorsAliases: false
});
let CONNECTION = MODE == "development" ? DB_DEVELOPMENT : DB_PRODUCTION;
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
exports.default = CONNECTION;
//# sourceMappingURL=connection.js.map