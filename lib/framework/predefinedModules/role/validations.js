"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const { dialect } = process.env;
exports.default = {
    createRole: {
        name: "string|required",
    },
    deleteRole: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    },
    updateRole: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        name: "string|required"
    },
    role: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    }
};
//# sourceMappingURL=validations.js.map