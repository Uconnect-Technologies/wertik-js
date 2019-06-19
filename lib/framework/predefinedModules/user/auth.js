"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.default = {
    validateAccessToken(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // let query = req.body.query;
            // let token = get(req,'headers.authorization','');
            // let isAuthGraphqlQuery = isAuthQuery(query);
            // if (isAuthGraphqlQuery) {
            // 	return {};
            // }
            // console.log(token);
            // if (!token) {
            // 	throw new ApolloError("JWT not passed",statusCodes.UNAUTHORIZED.number)
            // }
            // let isExpired = await isTokenExpired(token);
            // if (isExpired) {
            // 	throw new ApolloError("Jwt Token Expired",statusCodes.UNAUTHORIZED.number)
            // }
            // let user = await userModel.findOne({accessToken: token});
            // if (!user) {
            // 	throw new ApolloError("You should login",statusCodes.UNAUTHORIZED.number)
            // }
            // return {user: user};
        });
    }
};
//# sourceMappingURL=auth.js.map