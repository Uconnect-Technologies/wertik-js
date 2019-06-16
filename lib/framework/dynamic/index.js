"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = __importDefault(require("./mutations"));
const queries_1 = __importDefault(require("./queries"));
const resolvers_1 = __importDefault(require("./resolvers"));
const loader_1 = __importDefault(require("./loader"));
exports.default = {
    mutations: mutations_1.default,
    queries: queries_1.default,
    resolvers: resolvers_1.default,
    loader: loader_1.default
};
//# sourceMappingURL=index.js.map