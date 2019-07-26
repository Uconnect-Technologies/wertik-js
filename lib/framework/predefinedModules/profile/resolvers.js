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
let { userModel, profileModel } = allModels_1.default;
let profileResolver = index_1.default.resolvers({
    moduleName: 'Profile',
    validations: {
        create: validations_1.default.createProfile,
        delete: validations_1.default.deleteProfile,
        update: validations_1.default.updateProfile,
        view: validations_1.default.profile
    },
    model: profileModel
});
exports.default = {
    Subscription: index_1.default.loader("Role", profileResolver).subscriptions,
    Profile: {
        user(profile) {
            return __awaiter(this, void 0, void 0, function* () {
                // return await relateResolver(userModel,profile,'user');
            });
        }
    },
    queries: index_1.default.loader("Profile", profileResolver).queries,
    mutations: index_1.default.loader("Profile", profileResolver).mutations
};
//# sourceMappingURL=resolvers.js.map