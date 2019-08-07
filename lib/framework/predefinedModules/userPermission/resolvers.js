"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = __importDefault(require("./validations"));
const index_1 = __importDefault(require("./../../../framework/dynamic/index"));
//@ts-ignore
const allModels_1 = __importDefault(require("./../../../framework/dynamic/allModels"));
let { userPermissionModel, permissionModel, roleModel } = allModels_1.default;
let userPermissionResolver = index_1.default.resolvers({
    moduleName: "UserPermission",
    validations: {
        create: validations_1.default.createUserPermission,
        delete: validations_1.default.deleteUserPermission,
        update: validations_1.default.updateUserPermission,
        view: validations_1.default.userPermission
    },
    model: userPermissionModel
});
exports.default = {
    Subscription: index_1.default.loader("UserPermission", userPermissionResolver)
        .subscriptions,
    UserPermission: {},
    queries: index_1.default.loader("UserPermission", userPermissionResolver).queries,
    mutations: index_1.default.loader("UserPermission", userPermissionResolver).mutations
};
//# sourceMappingURL=resolvers.js.map