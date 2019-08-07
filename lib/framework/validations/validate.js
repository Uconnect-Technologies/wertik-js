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
let Validator = require("validatorjs");
function default_1(schema, args) {
    return __awaiter(this, void 0, void 0, function* () {
        let keys = Object.keys(schema);
        keys.forEach(element => {
            schema[element] = schema[element].replace("int", "integer");
        });
        let validate = new Validator(args, schema);
        if (validate.passes()) {
            return { success: true };
        }
        else {
            return { success: false, errors: validate.errors.all() };
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=validate.js.map