"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
exports.default = {
    createUserPermission: {
        user: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        permission: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    },
    deleteUserPermission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    },
    updateUserPermission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        user: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        permission: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    },
    userPermission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    }
};
//# sourceMappingURL=validations.js.map