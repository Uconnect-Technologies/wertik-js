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
const allModels_1 = __importDefault(require("./../../../framework/dynamic/allModels"));
let { roleModel, rolePermissionsModel } = allModels_1.default;
let roleResolver = index_1.default.resolvers({
    moduleName: 'Role',
    validations: {
        create: validations_1.default.createRole,
        delete: validations_1.default.deleteRole,
        update: validations_1.default.updateRole,
        view: validations_1.default.role
    },
    model: roleModel
});
exports.default = {
    Subscription: index_1.default.loader("Role", roleResolver).subscriptions,
    Role: {
        permissions(role) {
            return __awaiter(this, void 0, void 0, function* () {
                // return await relateResolver(rolePermissionsModel,role,'permission',true);
            });
        }
    },
    mutations: index_1.default.loader("Role", roleResolver).mutations,
    queries: index_1.default.loader("Role", roleResolver).queries
};
//# sourceMappingURL=resolvers.js.map