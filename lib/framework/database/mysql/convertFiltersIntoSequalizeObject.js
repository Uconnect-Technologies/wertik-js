"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let Sequelize = require("sequelize");
const parseMultipleValuesIntoArray_1 = __importDefault(require("./filters/parseMultipleValuesIntoArray"));
const validateFiltersArray_1 = __importDefault(require("./../../security/validateFiltersArray"));
const Op = Sequelize.Op;
/* http://docs.sequelizejs.com/manual/querying.html#operators */
function default_1(filters) {
    return __awaiter(this, void 0, void 0, function* () {
        let f = {};
        if (validateFiltersArray_1.default(filters)) {
            filters.forEach((item) => {
                if (!f[item.column]) {
                    f[item.column] = {};
                    let parsedValue;
                    let operator = item.operator.toLowerCase();
                    if (operator == "and") {
                        parsedValue = parseMultipleValuesIntoArray_1.default(item.value, " and ");
                        f[item.column][Op.and] = parsedValue;
                    }
                    else if (operator == "eq" || operator == "equals" || operator == "=") {
                        f[item.column][Op.eq] = item.value;
                    }
                    else if (operator == "or") {
                        parsedValue = parseMultipleValuesIntoArray_1.default(item.value, " or ");
                        f[item.column][Op.or] = parsedValue;
                    }
                    else if (operator == "gt" || operator == ">" || operator == "greater_than") {
                        f[item.column][Op.gt] = item.value;
                    }
                    else if (operator == "lt" || operator == "<" || operator == "less_than") {
                        f[item.column][Op.lt] = item.value;
                    }
                    else if (operator == "lte" || operator == "=<" || operator == "less_than_or_equals") {
                        f[item.column][Op.lte] = item.value;
                    }
                    else if (operator == "gte" || operator == "=>" || operator == "greater_than_or_equals") {
                        f[item.column][Op.gte] = item.value;
                    }
                    else if (operator == "between" || operator == "inlist") {
                        parsedValue = parseMultipleValuesIntoArray_1.default(item.value, " between ");
                        f[item.column][Op.between] = parsedValue;
                    }
                    else if (operator == "notbetween" || operator == "notinlist") {
                        parsedValue = parseMultipleValuesIntoArray_1.default(item.value, " notBetween ");
                        f[item.column][Op.notBetween] = parsedValue;
                    }
                    else if (operator == "in") {
                        parsedValue = parseMultipleValuesIntoArray_1.default(item.value, " in ");
                        f[item.column][Op.in] = parsedValue;
                    }
                    else if (operator == "notin") {
                        parsedValue = parseMultipleValuesIntoArray_1.default(item.value, " notIn ");
                        f[item.column][Op.in] = parsedValue;
                    }
                    else if (operator == "like") {
                        f[item.column][Op.like] = item.value;
                    }
                    else if (operator == "includes") {
                        f[item.column][Op.substring] = item.value;
                    }
                    else if (operator == "startswith") {
                        f[item.column][Op.startsWith] = item.value;
                    }
                    else if (operator == "endswith") {
                        f[item.column][Op.endsWith] = item.value;
                    }
                }
            });
            return f;
        }
        else {
            throw new Error("Please pass validate filters.");
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=convertFiltersIntoSequalizeObject.js.map