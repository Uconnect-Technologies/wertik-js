"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const primaryKey_2 = require("./../../../framework/helpers/primaryKey");
let primaryKeyType2 = primaryKey_2.primaryKeyType.toLowerCase();
exports.default = {
    createProfile: {
        user: `${primaryKeyType2}|required`,
        description: "string|required"
    },
    deleteProfile: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
    },
    updateProfile: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
        description: "string"
    },
    profile: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
    }
};
//# sourceMappingURL=validations.js.map