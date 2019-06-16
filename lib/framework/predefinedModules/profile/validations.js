"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const { DIALECT } = process.env;
exports.default = {
    createProfile: {
        user: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
        description: "string|required"
    },
    deleteProfile: {
        [getIdName_1.default]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    },
    updateProfile: {
        [getIdName_1.default]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
        description: "string"
    },
    profile: {
        [getIdName_1.default]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    }
};
//# sourceMappingURL=validations.js.map