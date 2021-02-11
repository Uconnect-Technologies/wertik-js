"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const sequelize_1 = require("sequelize");
const consoleMessages_1 = require("../logger/consoleMessages");
const index_1 = require("../defaults/options/index");
function default_1(database) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let DATABASE_INSTANCE;
                let dialect = database.dbDialect;
                let options;
                if (dialect == "postgres") {
                    options = lodash_1.get(database, "dbInitializeOptions", index_1.databaseDefaultOptions.postgres.dbInitializeOptions);
                    DATABASE_INSTANCE = new sequelize_1.Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, Object.assign({ dialect: "postgres", host: database.dbHost, port: database.dbPort }, options));
                }
                else if (dialect === "mysql") {
                    options = lodash_1.get(database, "dbInitializeOptions", index_1.databaseDefaultOptions.sql.dbInitializeOptions);
                    DATABASE_INSTANCE = new sequelize_1.Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, Object.assign({ dialect: "mysql", host: database.dbHost, port: database.dbPort }, options));
                }
                DATABASE_INSTANCE.authenticate()
                    .then(() => {
                    consoleMessages_1.successMessage(`Database: Successfully Connected!`);
                })
                    .catch((e) => {
                    console.log(e);
                    process.exit();
                });
                resolve(DATABASE_INSTANCE);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.default = default_1;
//# sourceMappingURL=connect.js.map