System.register(["../../helpers/getAllSchemasAsObject", "./generateTables"], function (exports_1, context_1) {
    "use strict";
    var Sequelize, getAllSchemasAsObject_1, generateTables_1, _a, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, MODE, DB_PRODUCTION, DB_DEVELOPMENT, CONNECTION, f, tables, models;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getAllSchemasAsObject_1_1) {
                getAllSchemasAsObject_1 = getAllSchemasAsObject_1_1;
            },
            function (generateTables_1_1) {
                generateTables_1 = generateTables_1_1;
            }
        ],
        execute: function () {
            Sequelize = require("sequelize");
            _a = process.env, DB_USERNAME = _a.DB_USERNAME, DB_PASSWORD = _a.DB_PASSWORD, DB_NAME = _a.DB_NAME, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT, MODE = _a.MODE;
            DB_PRODUCTION = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
                dialect: "mysql",
                host: DB_HOST,
                port: DB_PORT,
                logging: false,
                operatorsAliases: false
            });
            DB_DEVELOPMENT = new Sequelize(DB_NAME + "_dev", DB_USERNAME, DB_PASSWORD, {
                dialect: "mysql",
                host: DB_HOST,
                port: DB_PORT,
                logging: false,
                operatorsAliases: false
            });
            CONNECTION = MODE == "development" ? DB_DEVELOPMENT : DB_PRODUCTION;
            f = getAllSchemasAsObject_1["default"]();
            tables = generateTables_1["default"](f, CONNECTION);
            tables.forEach(function (element) {
                CONNECTION.define(element.tableName, element.fields, {
                    paranoid: true,
                    underscored: true,
                    freezeTableName: true
                });
            });
            exports_1("models", models = CONNECTION.models);
            exports_1("default", CONNECTION);
        }
    };
});
//# sourceMappingURL=connection.js.map