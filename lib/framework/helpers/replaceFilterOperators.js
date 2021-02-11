"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
const wrap = (operator) => {
    return Op[operator.replace("_", "")];
};
const iterate = (obj) => {
    const isObject = lodash_1.isPlainObject(obj);
    const isArray = Array.isArray(obj);
    if (isObject) {
        const keys = Object.keys(obj);
        keys.forEach((element) => {
            const value = obj[element];
            const isArray = Array.isArray(value);
            const isObject = lodash_1.isPlainObject(value);
            if (element.indexOf("_") === 0) {
                const newWrapValue = wrap(element);
                obj[newWrapValue] = obj[element];
                delete obj[element];
            }
            if (isArray === true || isObject === true) {
                iterate(value);
            }
        });
        return obj;
    }
    else {
        obj.forEach((element) => {
            iterate(element);
        });
    }
};
exports.default = iterate;
//# sourceMappingURL=replaceFilterOperators.js.map