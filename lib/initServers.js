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
const index_1 = __importDefault(require("./framework/graphql/index"));
const index_2 = __importDefault(require("./framework/api-server/index"));
function default_1(dir, app) {
    return __awaiter(this, void 0, void 0, function* () {
        index_1.default(dir, app);
        index_2.default(dir, app);
        return {
            connection: {
                mysql: {
                    sync: require("./framework/database/mysql/connection").syncDatabase
                },
                MONGO_DB: {}
            }
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=initServers.js.map