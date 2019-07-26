"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./main"));
const dev_server_configuration_1 = __importDefault(require("./dev-server-configuration"));
let a = main_1.default.run(dev_server_configuration_1.default);
a.then(app => {
    let mysqlSeedRunner = require("./framework/database/mongodb/runSeeds").default;
    console.log("Running seeds for MongoDB");
    mysqlSeedRunner({ "asd": "ads" });
});
//# sourceMappingURL=seed-mongo.js.map