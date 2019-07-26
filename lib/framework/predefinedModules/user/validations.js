"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const primaryKey_2 = require("./../../../framework/helpers/primaryKey");
let primaryKeyType2 = primaryKey_2.primaryKeyType.toLowerCase();
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
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
    },
    changePassword: {
        oldPassword: "string|min:3|required",
        newPassword: "string|min:3|required",
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
    },
    deleteUser: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
    },
    updateUser: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
        name: "string|min:3",
        email: "string",
        age: "integer",
        gender: "integer",
        isSuperUser: "boolean"
    },
};
//# sourceMappingURL=validations.js.map