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
const validations_1 = __importDefault(require("./validations"));
const index_1 = __importDefault(require("./../../../framework/dynamic/index"));
//@ts-ignore
const allModels_1 = __importDefault(require("./../../../framework/dynamic/allModels"));
const relateResolver_1 = __importDefault(require("./../../../framework/database/relateResolver"));
let { userPermissionModel, permissionModel, roleModel, userModel } = allModels_1.default;
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
    UserPermission: {
        user(userPermission) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield relateResolver_1.default({
                    relateWith: userModel,
                    model: userPermission,
                    relationName: "user",
                    type: "single"
                });
            });
        },
        permission(userPermission) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield relateResolver_1.default({
                    relateWith: permissionModel,
                    model: userPermission,
                    relationName: "permission",
                    type: "single"
                });
            });
        }
    },
    Subscription: index_1.default.loader("UserPermission", userPermissionResolver).subscriptions,
    queries: index_1.default.loader("UserPermission", userPermissionResolver).queries,
    mutations: index_1.default.loader("UserPermission", userPermissionResolver).mutations
};
//# sourceMappingURL=resolvers.js.map