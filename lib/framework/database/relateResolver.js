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
function default_1(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        // let type = get(obj, "type", "single");
        // if (type == "multiple") {
        // }else {
        // 	return await relateWith.findOne
        // }
        // let { relateWith, currentInstance, resolverName } = obj;
        // if (type == "multiple") {
        //   return await relateWith.paginate({});
        // } else {
        //   return await relateWith.findOne({ [primaryKey]: currentInstance[resolverName] });
        // }
    });
}
exports.default = default_1;
//# sourceMappingURL=relateResolver.js.map