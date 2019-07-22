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
const lodash_1 = require("lodash");
function default_1(model, id, requestedFields) {
    return __awaiter(this, void 0, void 0, function* () {
        let hasRequestedAllFields = lodash_1.get(requestedFields, 'length', 0) == 0;
        let object = {};
        if (hasRequestedAllFields) {
            object = yield model.findByPk(id);
        }
        else {
            object = yield model.findOne({
                where: {
                    id: id,
                },
                attributes: requestedFields
            });
        }
        return object;
    });
}
exports.default = default_1;
//# sourceMappingURL=findOneByPK.js.map