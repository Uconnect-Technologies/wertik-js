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
let moment = require("moment");
let jwt = require("jsonwebtoken");
function createJwtToken(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof data !== "object") {
            throw "Data must be object";
        }
        let firstArgument = data;
        let secret = process.env.jwtSecret || "asdasdasd";
        return yield jwt.sign(firstArgument, secret, { expiresIn: data.expiresIn });
    });
}
exports.default = createJwtToken;
//# sourceMappingURL=createJwtToken.js.map