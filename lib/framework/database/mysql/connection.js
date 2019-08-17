"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let Sequelize = require("sequelize");
const getAppSchemaAsObject_1 = __importDefault(require("../../helpers/getAppSchemaAsObject"));
const convertAppSchemaToObject_1 = __importDefault(require("../../helpers/convertAppSchemaToObject"));
const { dbusername, dbPassword, dbName, dbHost, dbPort, mode, dbMysqlSync } = process.env;
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
let tables = convertAppSchemaToObject_1.default(getAppSchemaAsObject_1.default());
tables.forEach((element, index) => {
    // Create MYSQl table and convert the string into snake from camel case
    CONNECTION.define(element.tableName, Object.assign({}, element.fields, { created_at: { type: Sequelize.DATE, field: "created_at" }, updated_at: { type: Sequelize.DATE, field: "updated_at" }, deleted_at: { type: Sequelize.DATE, field: "deleted_at" } }), {
        paranoid: true,
        freezeTableName: true,
        underscored: true,
        timestamps: true
    });
    if (index == tables.length - 1 && dbMysqlSync) {
        CONNECTION.sync();
    }
});
exports.default = CONNECTION;
exports.models = CONNECTION.models;
exports.modelsWithSchema = tables;
//# sourceMappingURL=connection.js.map