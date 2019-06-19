"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
exports.default = {
    createPermission: {
        action: "string|required"
    },
    deletePermission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    },
    updatePermission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        action: "string|required"
    },
    permission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    }
};
//# sourceMappingURL=validations.js.map