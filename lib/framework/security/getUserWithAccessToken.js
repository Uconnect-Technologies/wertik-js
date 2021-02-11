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
Object.defineProperty(exports, "__esModule", { value: true });
let { get } = require("lodash");
function default_1(UserModel, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let find = yield UserModel.findOne({
                where: {
                    access_token: token,
                },
                include: "*",
            });
            return get(find, "instance", null);
        }
        catch (errorInstance) {
            let modules = process.env.builtinModules;
            modules = modules.split(",");
            modules = modules.filter((c) => c);
            if (modules.length == 0) {
                return null;
            }
            else {
                throw errorInstance;
            }
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=getUserWithAccessToken.js.map