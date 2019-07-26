"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
exports.default = {
    createPermission: {
        name: "string|required",
        cant: "string|required",
        can: "string|required"
    },
    deletePermission: {
        [primaryKey_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    },
    updatePermission: {
        [primaryKey_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        name: "string|required",
        cant: "string|required",
        can: "string|required"
    },
    permission: {
        [primaryKey_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    }
};
//# sourceMappingURL=validations.js.map