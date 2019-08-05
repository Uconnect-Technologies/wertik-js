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
let { ApolloError } = require("apollo-server");
let jwt = require("jsonwebtoken");
let { get } = require("lodash");
const statusCodes_1 = __importDefault(require("./../helpers/statusCodes"));
function default_1(jwtToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let decoded = yield jwt.decode(jwtToken, get(process, 'env.JWT_SECRET', ''));
            let { expireDate } = decoded;
            let current = +new Date();
            let expireDateSeconds = expireDate * 1000;
            if (expireDateSeconds < current) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            throw new ApolloError("JWT Token Mismatched", statusCodes_1.default.BAD_REQUEST.number);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=isTokenExpired.js.map