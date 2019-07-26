"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
function default_1(filters) {
    return __awaiter(this, void 0, void 0, function* () {
        let f = {};
        filters.forEach((item) => {
            if (!f[item.column]) {
                f[item.column] = {};
            }
            /* tslint:disable-next-line */
            // f[item.column][typeValues[item.operator]] = item.value;
        });
        return f;
    });
}
exports.default = default_1;
//# sourceMappingURL=convertFiltersIntoSequalizeObject.js.map