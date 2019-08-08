"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const primaryKey_1 = __importDefault(require("./../helpers/primaryKey"));
function default_1(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        let { model, relateWith, type, relationName } = obj;
        if (type == "multiple") {
            let filters = [{ column: relationName, value: model[primaryKey_1.default], operator: "=" }];
            return yield relateWith.paginate({ filters: filters });
        }
        else {
            return yield relateWith.findOne({ [primaryKey_1.default]: model[relationName] });
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=relateResolver.js.map