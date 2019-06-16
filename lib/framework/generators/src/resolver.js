"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = __importDefault(require("./validations"));
const index_1 = __importDefault(require("./../../../framework/dynamic/index"));
const allModels_1 = __importDefault(require("./../../../framework/dynamic/allModels"));
let { gameModel } = allModels_1.default;
let gameResolver = index_1.default.resolvers({
    moduleName: 'game',
    validations: {
        create: validations_1.default.creategame,
        delete: validations_1.default.deletegame,
        update: validations_1.default.updategame,
        view: validations_1.default.game
    },
    model: gameModel
});
exports.default = {
    queries: Object.assign({}, index_1.default.loader("game", gameResolver).mutations),
    mutations: Object.assign({}, index_1.default.loader("game", gameResolver).mutations),
};
//# sourceMappingURL=resolver.js.map