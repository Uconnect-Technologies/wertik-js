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
const isAuthQuery_1 = __importDefault(require("./isAuthQuery"));
function default_1({ req, res }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(isAuthQuery_1.default(req.body.query));
        // const token = req.headers.authorization || "";
        // if (!token) {
        //   internalServerError({
        //     message: "Unauthorized, Reason: Missing auth token"
        //   });
        // }
        // let user = await getUserWithAccessToken(token);
        // if (!user) {
        //   internalServerError({ message: "Unauthorized, You need to signin." });
        // }
        // return {
        //   user
        // };
    });
}
exports.default = default_1;
//# sourceMappingURL=validateAccessToken.js.map