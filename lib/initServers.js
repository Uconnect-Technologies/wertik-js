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
const logger_1 = __importDefault(require("./framework/helpers/logger"));
function default_1(dir, app) {
    return __awaiter(this, void 0, void 0, function* () {
        index_1.default(dir, app);
        index_2.default(dir, app);
        let dialect = process.env.dialect;
        let db = {
            connection: {},
            models: []
        };
        if (dialect == "MYSQL") {
            db.connection = require("./framework/database/mysql/connection");
        }
        else if (dialect == "MONGO_DB") {
            db.connection = require("./framework/database/mongodb/connection");
        }
        db.models = require("./framework/dynamic/allModels").default;
        return Object.assign({}, db, { logger: logger_1.default });
    });
}
exports.default = default_1;
//# sourceMappingURL=initServers.js.map