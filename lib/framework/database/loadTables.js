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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("./helpers/index");
const consoleMessages_1 = require("../logger/consoleMessages");
const index_2 = require("../defaults/options/index");
const database_1 = require("../moduleRelationships/database");
const stats_1 = __importDefault(require("./helpers/stats"));
const paginate_1 = __importDefault(require("./helpers/paginate"));
const checkDatabaseOptions = (moduleName, tableName) => {
    if (moduleName && !tableName) {
        consoleMessages_1.errorMessage(`Module ${moduleName} didn't provided table name. Exiting process.`);
        process.exit();
    }
};
function default_1(connection, configuration) {
    let dialect = process.env.dbDialect;
    let modules = process.env.builtinModules.split(",");
    modules = modules.filter((c) => c);
    modules = [...modules, ...lodash_1.get(configuration, "modules", [])];
    let tables = {};
    const processModule = (module) => {
        let moduleName = lodash_1.get(module, "name", "");
        let useDatabase = lodash_1.get(module, "useDatabase", true);
        if (useDatabase) {
            let tableName = lodash_1.get(module, "database.sql.tableName", "");
            checkDatabaseOptions(moduleName, tableName);
            let tableFields = index_1.convertFieldsIntoSequelizeFields(module.database.sql.fields);
            let tableOptions = lodash_1.get(module, "database.sql.tableOptions", index_2.databaseDefaultOptions.sql.defaultTableOptions);
            tables[moduleName] = connection.define(tableName, Object.assign(Object.assign({}, tableFields), index_2.databaseDefaultOptions.sql.timestamps), Object.assign(Object.assign({}, tableOptions), { getterMethods: {
                    created_at: function () {
                        return moment_1.default(this.getDataValue("created_at")).format();
                    },
                    updated_at: function () {
                        return moment_1.default(this.getDataValue("updated_at")).format();
                    },
                } }));
            tables[moduleName].wertikModule = module;
            tables[moduleName].selectIgnoreFields = lodash_1.get(module, "database.selectIgnoreFields", []);
        }
    };
    modules.forEach((element) => {
        let module;
        if (element.constructor === String) {
            module = require(`./../builtinModules/${element}/index`).default;
        }
        else if (element.constructor === Object) {
            module = element;
        }
        processModule(module);
    });
    // Apply relationships
    modules.forEach((element) => {
        let module;
        if (element.constructor === String) {
            module = require(`./../builtinModules/${element}/index`).default;
        }
        else if (element.constructor === Object) {
            module = element;
        }
        database_1.applyRelationshipSql(module, tables);
    });
    Object.keys(tables).forEach((table) => __awaiter(this, void 0, void 0, function* () {
        tables[table].stats = yield stats_1.default(connection, tables[table]);
        tables[table].paginate = yield paginate_1.default(tables[table]);
    }));
    return tables;
}
exports.default = default_1;
//# sourceMappingURL=loadTables.js.map