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
const internalServerError_1 = __importDefault(require("./../helpers/internalServerError"));
const getUserWithAccessToken_1 = __importDefault(require("./getUserWithAccessToken"));
const lodash_1 = require("lodash");
const isAuthQuery_1 = __importDefault(require("./isAuthQuery"));
function default_1({ req, res }) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = lodash_1.get(req, "body.query", "");
        const isAuth = isAuthQuery_1.default(query);
        if (isAuth) {
            return {};
        }
        let token = lodash_1.get(req, "headers.authorization", false);
        token = token.replace("bearer ", "");
        if (token === false) {
            throw internalServerError_1.default({ message: "Unauthorized, Reason: Missing auth token" }, 401);
        }
        let user = yield getUserWithAccessToken_1.default(token);
        if (!user) {
            throw internalServerError_1.default({ message: "Unauthorized, You need to signin." }, 401);
        }
        return {
            user
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=validateAccessToken.js.map