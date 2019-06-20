"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = __importDefault(require("./validations"));
const index_1 = __importDefault(require("./../../../framework/dynamic/index"));
const allModels_1 = __importDefault(require("./../../../framework/dynamic/allModels"));
let { permissionModel } = allModels_1.default;
let permissionResolver = index_1.default.resolvers({
    moduleName: 'Permission',
    validations: {
        create: validations_1.default.createPermission,
        delete: validations_1.default.deletePermission,
        update: validations_1.default.updatePermission,
        view: validations_1.default.permission
    },
    model: permissionModel
});
exports.default = {
    queries: Object.assign({}, index_1.default.loader("Permission", permissionResolver).queries),
    mutations: Object.assign({}, index_1.default.loader("Permission", permissionResolver).mutations),
};
//# sourceMappingURL=resolvers.js.map