"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
let Validator = require('validatorjs');
const primaryKey_1 = __importStar(require("./../../../framework/helpers/primaryKey"));
const { dialect } = process.env;
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
        [primaryKey_1.default]: `${primaryKey_1.primaryKeyType}|required`
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