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
let jwt = require("jsonwebtoken");
const getUserWithTokenAndEmail_1 = __importDefault(require("./getUserWithTokenAndEmail"));
function isTokenValid(token) {
    return __awaiter(this, void 0, void 0, function* () {
        let decoded = jwt.decode(token, get(process, 'env.JWT_SECRET', ''));
        let email = get(decoded, 'email', null);
        if (!email) {
            return false;
        }
        let user = yield getUserWithTokenAndEmail_1.default(email, token);
        if (!user) {
            return false;
        }
        return user;
    });
}
exports.default = isTokenValid;
//# sourceMappingURL=isTokenValid.js.map