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
const relateResolver_1 = __importDefault(require("./../../../framework/database/relateResolver"));
let { userRoleModel, userModel, roleModel } = allModels_1.default;
let userRoleResolver = index_1.default.resolvers({
    moduleName: 'UserRole',
    validations: {
        create: validations_1.default.createUserRole,
        delete: validations_1.default.deleteUserRole,
        update: validations_1.default.updateUserRole,
        view: validations_1.default.userRole
    },
    model: userRoleModel
});
exports.default = {
    UserRole: {
        user: (userRole) => __awaiter(this, void 0, void 0, function* () {
            return yield relateResolver_1.default(userModel, userRole, 'user');
        }),
        role: (userRole) => __awaiter(this, void 0, void 0, function* () {
            return yield relateResolver_1.default(roleModel, userRole, 'role');
        })
    },
    queries: Object.assign({}, index_1.default.loader("UserRole", userRoleResolver).queries),
    mutations: Object.assign({}, index_1.default.loader("UserRole", userRoleResolver).mutations),
};
//# sourceMappingURL=resolvers.js.map