"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultConfiguration_1 = __importDefault(require("./defaultConfiguration"));
let configuration = Object.assign({}, defaultConfiguration_1.default);
configuration.database = {
    dbDialect: "mongodb",
    mongoDBURI: "mongodb://iksdatoo:pass123@ds057204.mlab.com:57204/graphql",
};
exports.default = configuration;
//# sourceMappingURL=mongoDBConfiguration.js.map