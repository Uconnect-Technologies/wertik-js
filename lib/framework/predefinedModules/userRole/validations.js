"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const primaryKey_2 = require("./../../../framework/helpers/primaryKey");
let primaryKeyType2 = primaryKey_2.primaryKeyType.toLowerCase();
exports.default = {
    createUserRole: {
        user: `${primaryKeyType2}|required`,
        role: `${primaryKeyType2}|required`,
    },
    deleteUserRole: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
    },
    updateUserRole: {
        user: `${primaryKeyType2}|required`,
        role: `${primaryKeyType2}|required`,
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
    },
    userRole: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
    },
};
//# sourceMappingURL=validations.js.map