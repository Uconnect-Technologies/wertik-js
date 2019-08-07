"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const primaryKey_2 = require("./../../../framework/helpers/primaryKey");
let primaryKeyType2 = primaryKey_2.primaryKeyType.toLowerCase();
exports.default = {
    createUserPermission: {
        user: `${primaryKeyType2}|required`,
        permission: `${primaryKeyType2}|required`
    },
    deleteUserPermission: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`
    },
    updateUserPermission: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
        user: `${primaryKeyType2}|required`,
        permission: `${primaryKeyType2}|required`
    },
    userPermission: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`
    }
};
//# sourceMappingURL=validations.js.map