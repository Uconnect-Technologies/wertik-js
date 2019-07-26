"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const primaryKey_2 = require("./../../../framework/helpers/primaryKey");
const { dialect } = process.env;
let primaryKeyType2 = primaryKey_2.primaryKeyType.toLowerCase();
exports.default = {
    createRole: {
        name: "string|required"
    },
    deleteRole: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`
    },
    updateRole: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`,
        name: "string|required"
    },
    role: {
        [primaryKey_1.default]: `${primaryKeyType2}|required`
    }
};
//# sourceMappingURL=validations.js.map