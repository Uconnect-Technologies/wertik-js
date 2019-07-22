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
function default_1(model, args, requestedFields) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("view mongo", requestedFields);
        const { _id } = args;
        let response = yield model.findOne({ _id: _id });
        return response;
    });
}
exports.default = default_1;
//# sourceMappingURL=view.js.map