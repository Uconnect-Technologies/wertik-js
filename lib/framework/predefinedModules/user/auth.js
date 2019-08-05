"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let { get } = require("lodash");
let { ApolloError } = require("apollo-server");
const connection_1 = require("./../../../framework/database/connection");
const model_1 = __importDefault(require("./../../../framework/model/model"));
let userModel = new model_1.default({
    models: connection_1.models,
    tableName: "user"
});
//# sourceMappingURL=auth.js.map