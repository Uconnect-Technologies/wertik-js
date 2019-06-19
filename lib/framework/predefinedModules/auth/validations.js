"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let Validator = require('validatorjs');
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const { DIALECT } = process.env;
exports.default = {
    twoFactorLogin: {
        email: "required|email"
    },
    loginWithAccessToken: {
        accessToken: "string|required",
        refreshToken: "string"
    },
    twoFactorLoginValidate: {
        twoFactorCode: "string|required"
    },
    signup: {
        email: "email|required",
        name: "string",
        referer: "string",
        password: "string|required|min:3",
        confirmPassword: "string|required|min:3"
    },
    activateAccount: {
        activationToken: "string|required",
    },
    viewUser: {
        [getIdName_1.default]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    },
    login: {
        email: "string|required",
        password: "string|required"
    },
    refreshToken: {
        refreshToken: "string|required"
    }
};
//# sourceMappingURL=validations.js.map