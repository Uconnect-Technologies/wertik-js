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
let { get } = require("lodash");
const findOneByPK_1 = __importDefault(require("./findOneByPK"));
function default_1(model, args, requestedFields) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = get(args, 'id', null);
        let updateObject = yield findOneByPK_1.default(model, id, requestedFields);
        let update = yield updateObject.update(args);
        return update;
    });
}
exports.default = default_1;
//# sourceMappingURL=update.js.map