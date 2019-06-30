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
let { rolePermissionModel, permissionModel, roleModel } = allModels_1.default;
let rolePermissionResolver = index_1.default.resolvers({
    moduleName: 'RolePermission',
    validations: {
        create: validations_1.default.createRolePermission,
        delete: validations_1.default.deleteRolePermission,
        update: validations_1.default.updateRolePermission,
        view: validations_1.default.rolePermission
    },
    model: rolePermissionModel
});
exports.default = {
    Subscription: index_1.default.loader("Role", rolePermissionResolver).subscriptions,
    RolePermission: {
        permission(rolePermission) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield relateResolver_1.default(permissionModel, rolePermission, 'permission');
            });
        },
        role(rolePermission) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield relateResolver_1.default(roleModel, rolePermission, 'role');
            });
        }
    },
    queries: index_1.default.loader("RolePermission", rolePermissionResolver).queries,
    mutations: index_1.default.loader("RolePermission", rolePermissionResolver).mutations
};
//# sourceMappingURL=resolvers.js.map