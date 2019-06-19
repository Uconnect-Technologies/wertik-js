"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const { DIALECT } = process.env;
exports.default = {
    twoFactorLogin: {
        email: "email|required"
    },
    loginWithAccessToken: {
        accessToken: "string|required",
        refreshToken: "string",
    },
    twoFactorLoginValidate: {
        twoFactorCode: "string|required"
    },
    signup: {
        email: "email|required",
        name: "string",
        referer: "string",
        password: "string|min:3|required",
        confirmPassword: "string|min:3|required"
    },
    activateAccount: {
        activationToken: "string|required"
    },
    viewUser: {
        [getIdName_1.default]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    },
    changePassword: {
        oldPassword: "string|min:3|required",
        newPassword: "string|min:3|required",
        [getIdName_1.default]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    },
    deleteUser: {
        [getIdName_1.default]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    },
    updateUser: {
        [getIdName_1.default]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
        name: "string|min:3",
        email: "string",
        age: "integer",
        gender: "integer",
        isSuperUser: "boolean"
    },
};
//# sourceMappingURL=validations.js.map