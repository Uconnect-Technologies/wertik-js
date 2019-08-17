"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatorjs_1 = __importDefault(require("validatorjs"));
const lodash_1 = require("lodash");
function default_1(configuration = {}) {
    let mongoRules = {};
    let mysqlRules = {};
    let dialect = lodash_1.get(configuration, "dialect", null);
    if (!dialect) {
        throw new Error("Please pass dialect, without dialect the Wertik cannot run, The dialect is your database system, MYSQL or MONGO");
        process.exit();
    }
    if (dialect == "MYSQL") {
        mysqlRules = {
            dbUsername: "required",
            dbPort: "required",
            dbName: "required",
            dbHost: "required"
        };
    }
    else if (dialect == "MONGO_DB") {
        mongoRules = {
            mongoURI: "required"
        };
    }
    let rules = Object.assign({ name: "required", port: "required", mode: "required", jwtSecret: "required|min:3", modulesEnabled: "true", frontendAppUrl: "required", predefinedModules: "required", frontendAppPasswordResetUrl: "required" }, mysqlRules, mongoRules);
    let validation = new validatorjs_1.default(configuration, rules);
    if (validation.passes() === false) {
        console.log("Erorrs while configurating Wertik, Your configuration: ", configuration);
        Object.keys(validation.errors.errors).forEach(element => {
            console.log(`
        ${element}: 
          ${validation.errors.errors[element].join("\n")}
      `);
        });
        throw new Error("Configuration is not complete");
    }
}
exports.default = default_1;
//# sourceMappingURL=validateConfigurationObject.js.map