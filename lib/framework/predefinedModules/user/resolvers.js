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
let bcrypt = require("bcrypt-nodejs");
let { ApolloError } = require("apollo-server");
const internalServerError_1 = __importDefault(require("./../../../framework/helpers/internalServerError"));
const validations_1 = __importDefault(require("./validations"));
const validate_1 = __importDefault(require("./../../../framework/validations/validate"));
const statusCodes_1 = __importDefault(require("./../../../framework/helpers/statusCodes"));
const index_1 = __importDefault(require("./../../../framework/dynamic/index"));
const index_2 = require("./../../../framework/mailer/index");
const allModels_1 = __importDefault(require("./../../../framework/dynamic/allModels"));
const relateResolver_1 = __importDefault(require("./../../../framework/database/relateResolver"));
let { userModel, userRoleModel, profileModel } = allModels_1.default;
let userResolver = index_1.default.resolvers({
    moduleName: 'User',
    validations: {
        delete: validations_1.default.deleteUser,
        update: validations_1.default.updateUser,
        view: validations_1.default.viewUser
    },
    model: userModel
});
let userDynamic = index_1.default.loader("User", userResolver);
let userQueries = userDynamic.queries;
let userMutations = userDynamic.mutations;
exports.default = {
    User: {
        assignedRoles(user) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield relateResolver_1.default(userRoleModel, user, 'id', true);
            });
        },
        profile(user) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield relateResolver_1.default(profileModel, user, 'profile');
            });
        }
    },
    queries: {
        listUserPermissions: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            try {
                return [{ action: 'asd' }];
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        listUser: userQueries.listUser,
        viewUser: userQueries.viewUser
    },
    mutations: {
        changePassword: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.changePassword, args);
            if (!v.success) {
                throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let user = yield userModel.view(args);
                if (!user) {
                    throw new ApolloError("User not found", statusCodes_1.default.BAD_REQUEST.number);
                }
                let correctPassword = bcrypt.compareSync(args.oldPassword, user.password);
                if (!correctPassword) {
                    throw new ApolloError("Password incorrect", statusCodes_1.default.BAD_REQUEST.number);
                }
                yield user.update({
                    password: bcrypt.hashSync(args.newPassword)
                });
                yield index_2.sendEmail('changePassword.hbs', {
                    userName: user.email,
                    siteName: process.env.NAME,
                    email: user.email,
                }, {
                    from: process.env.MAILER_SERVICE_USERNAME,
                    to: user.email,
                    subject: "Password changed"
                });
                let response = {};
                response.statusCode = statusCodes_1.default.OK.type;
                response.statusCodeNumber = statusCodes_1.default.OK.number;
                response.successMessageType = "Success";
                response.successMessage = "Password changed";
                return response;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        deleteUser: userMutations.deleteUser,
        updateUser: userMutations.updateUser,
        deleteBulkUser: userMutations.deleteBulkUser,
        updateBulkUser: userMutations.updateBulkUser,
    },
};
//# sourceMappingURL=resolvers.js.map