System.register(["./../../../framework/helpers/internalServerError", "./validations", "./../../../framework/validations/validate", "./../../../framework/helpers/statusCodes", "./../../../framework/mailer/index", "./../../../framework/helpers/getIdName", "./../../../framework/dynamic/allModels", "./../../../framework/database/relateResolver"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var _this, bcrypt, ApolloError, internalServerError_1, validations_1, validate_1, statusCodes_1, index_1, getIdName_1, allModels_1, relateResolver_1, userModel, userRoleModel, roleModel, profileModel, userPermissionModel;
    _this = this;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (internalServerError_1_1) {
                internalServerError_1 = internalServerError_1_1;
            },
            function (validations_1_1) {
                validations_1 = validations_1_1;
            },
            function (validate_1_1) {
                validate_1 = validate_1_1;
            },
            function (statusCodes_1_1) {
                statusCodes_1 = statusCodes_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (getIdName_1_1) {
                getIdName_1 = getIdName_1_1;
            },
            function (allModels_1_1) {
                allModels_1 = allModels_1_1;
            },
            function (relateResolver_1_1) {
                relateResolver_1 = relateResolver_1_1;
            }
        ],
        execute: function () {
            bcrypt = require("bcrypt-nodejs");
            ApolloError = require("apollo-server").ApolloError;
            userModel = allModels_1["default"].userModel, userRoleModel = allModels_1["default"].userRoleModel, roleModel = allModels_1["default"].roleModel, profileModel = allModels_1["default"].profileModel, userPermissionModel = allModels_1["default"].userPermissionModel;
            exports_1("default", {
                User: {
                    assignedPermissions: function (user) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, relateResolver_1["default"](userPermissionModel, user, 'id', true)];
                                    case 1: return [2, _a.sent()];
                                }
                            });
                        });
                    },
                    assignedRoles: function (user) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, relateResolver_1["default"](userRoleModel, user, 'id', true)];
                                    case 1: return [2, _a.sent()];
                                }
                            });
                        });
                    },
                    profile: function (user) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, relateResolver_1["default"](profileModel, user, 'profile')];
                                    case 1: return [2, _a.sent()];
                                }
                            });
                        });
                    }
                },
                queries: {
                    listUser: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var paginate, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4, userModel.paginate(args)];
                                case 1:
                                    paginate = _a.sent();
                                    return [2, paginate];
                                case 2:
                                    e_1 = _a.sent();
                                    return [2, internalServerError_1["default"](e_1)];
                                case 3: return [2];
                            }
                        });
                    }); },
                    viewUser: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, user, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].viewUser, args)];
                                case 1:
                                    v = _a.sent();
                                    if (!v.success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4, userModel.view(args)];
                                case 3:
                                    user = _a.sent();
                                    return [2, user];
                                case 4:
                                    e_2 = _a.sent();
                                    return [2, internalServerError_1["default"](e_2)];
                                case 5: return [2];
                            }
                        });
                    }); }
                },
                mutations: {
                    changePassword: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, user, correctPassword, response, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].changePassword, args)];
                                case 1:
                                    v = _a.sent();
                                    if (!v.success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 7]);
                                    return [4, userModel.view(args)];
                                case 3:
                                    user = _a.sent();
                                    if (!user) {
                                        throw new ApolloError("User not found", statusCodes_1["default"].BAD_REQUEST.number);
                                    }
                                    correctPassword = bcrypt.compareSync(args.oldPassword, user.password);
                                    if (!correctPassword) {
                                        throw new ApolloError("Password incorrect", statusCodes_1["default"].BAD_REQUEST.number);
                                    }
                                    return [4, user.update({
                                            password: bcrypt.hashSync(args.newPassword)
                                        })];
                                case 4:
                                    _a.sent();
                                    return [4, index_1.sendEmail('changePassword.hbs', {
                                            userName: user.email,
                                            siteName: process.env.NAME,
                                            email: user.email
                                        }, {
                                            from: process.env.MAILER_SERVICE_USERNAME,
                                            to: user.email,
                                            subject: "Password changed"
                                        }, null, null)];
                                case 5:
                                    _a.sent();
                                    response = {};
                                    response.statusCode = statusCodes_1["default"].OK.type;
                                    response.statusCodeNumber = statusCodes_1["default"].OK.number;
                                    response.successMessageType = "Success";
                                    response.successMessage = "Password changed";
                                    return [2, response];
                                case 6:
                                    e_3 = _a.sent();
                                    return [2, internalServerError_1["default"](e_3)];
                                case 7: return [2];
                            }
                        });
                    }); },
                    deleteUser: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, success, e_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].deleteUser, args)];
                                case 1:
                                    v = _a.sent();
                                    success = v.success;
                                    if (!success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4, userModel["delete"](args)];
                                case 3: return [2, _a.sent()];
                                case 4:
                                    e_4 = _a.sent();
                                    return [2, internalServerError_1["default"](e_4)];
                                case 5: return [2];
                            }
                        });
                    }); },
                    updateUser: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, user, e_5;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].updateUser, args)];
                                case 1:
                                    v = _b.sent();
                                    if (!v.success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 5, , 6]);
                                    return [4, userModel.findOne((_a = {}, _a[getIdName_1["default"]] = args[getIdName_1["default"]], _a))];
                                case 3:
                                    user = _b.sent();
                                    if (!user) {
                                        throw new ApolloError("User not found", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    return [4, user.update(args)];
                                case 4: return [2, _b.sent()];
                                case 5:
                                    e_5 = _b.sent();
                                    return [2, internalServerError_1["default"](e_5)];
                                case 6: return [2];
                            }
                        });
                    }); }
                }
            });
        }
    };
});
//# sourceMappingURL=resolvers.js.map