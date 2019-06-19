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
// import  from "lodash";
let { get } = require("lodash");
const allowGraphql = get(process, 'env.ALLOW_GRAPHQL', 'FALSE') === "TRUE";
const isTokenValid_1 = __importDefault(require("./isTokenValid"));
const isPublicToken_1 = __importDefault(require("./isPublicToken"));
const isAuthQuery_1 = __importDefault(require("./isAuthQuery"));
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let method = req.method.toLowerCase();
        if (method == "get" || allowGraphql) {
            next();
            return;
        }
        let query = get(req, 'body.query', '');
        if (!query) {
            return res.json({
                errorMessageType: "Error",
                errorMessage: "Query is required",
            });
        }
        let token = get(req, 'headers.authorization', '');
        let passQuery = isAuthQuery_1.default(query);
        if (passQuery) {
            return next();
        }
        let isPublic = isPublicToken_1.default(token);
        if (isPublic) {
            next();
        }
        let user = yield isTokenValid_1.default(token);
        let isCorrectAccessToken = get(user, 'id', false);
        if (!isCorrectAccessToken) {
            res.json({
                errorMessageType: "Error",
                errorMessage: "JWT token mismatched or incorrect",
            });
            return;
        }
        next();
    });
}
exports.default = default_1;
//# sourceMappingURL=validateGraphqlAccessToken.js.map