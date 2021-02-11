"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultConfiguration_1 = __importDefault(require("./defaultConfiguration"));
let configuration = Object.assign({}, defaultConfiguration_1.default);
configuration.database = {
    dbDialect: "postgres",
    dbUsername: "wmysixugpufzba",
    dbPassword: "7255d55e83deafe26d093306e958b7e50dad5ac02f687249d02c9a53590c120f",
    dbName: "d5rsarnju68s4f",
    dbHost: "ec2-54-246-89-234.eu-west-1.compute.amazonaws.com",
    dbPort: "5432"
};
exports.default = configuration;
//# sourceMappingURL=postgresConfiguration.js.map