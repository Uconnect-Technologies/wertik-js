"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./framework/graphql/index"));
const index_2 = __importDefault(require("./framework/api-server/index"));
function default_1(dir, app) {
    index_1.default(dir, app);
    index_2.default(dir, app);
}
exports.default = default_1;
//# sourceMappingURL=initServers.js.map