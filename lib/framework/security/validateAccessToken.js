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
const getUserWithAccessToken_1 = __importDefault(require("./getUserWithAccessToken"));
function default_1(userModel, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = accessToken.replace("bearer ", "");
        const user = yield getUserWithAccessToken_1.default(userModel, token);
        if (user) {
            return user;
        }
        else {
            throw new Error("Access token expired");
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=validateAccessToken.js.map