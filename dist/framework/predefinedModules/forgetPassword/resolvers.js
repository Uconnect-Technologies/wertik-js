System.register(["./../../../framework/helpers/internalServerError", "./validations", "./../../../framework/validations/validate", "./../../../framework/helpers/statusCodes", "./../../../framework/mailer/index", "./../../../framework/dynamic/allModels"], function (exports_1, context_1) {
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
    var _this, moment, bcrypt, ApolloError, internalServerError_1, validations_1, validate_1, statusCodes_1, index_1, allModels_1, forgetPasswordModel, userModel;
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
            function (allModels_1_1) {
                allModels_1 = allModels_1_1;
            }
        ],
        execute: function () {
            moment = require("moment");
            bcrypt = require("bcrypt-nodejs");
            ApolloError = require("apollo-server").ApolloError;
            forgetPasswordModel = allModels_1["default"].forgetPasswordModel, userModel = allModels_1["default"].userModel;
            exports_1("default", {
                queries: {
                    forgetPasswordView: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, success, forgetPassword, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].forgetPassword, args)];
                                case 1:
                                    v = _a.sent();
                                    success = v.success;
                                    if (!success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4, forgetPasswordModel.findOne({ token: args.token })];
                                case 3:
                                    forgetPassword = _a.sent();
                                    if (!forgetPassword) {
                                        throw new ApolloError("Token expired or not found.", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    forgetPassword.successMessageType = "Successfull";
                                    forgetPassword.successMessage = "Forget password item";
                                    forgetPassword.statusCode = statusCodes_1["default"].OK.type;
                                    forgetPassword.statusCodeNumber = statusCodes_1["default"].OK.number;
                                    return [2, forgetPassword];
                                case 4:
                                    e_1 = _a.sent();
                                    return [2, internalServerError_1["default"](e_1)];
                                case 5: return [2];
                            }
                        });
                    }); }
                },
                mutations: {
                    requestPasswordReset: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, success, user, token, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].requestPasswordReset, args)];
                                case 1:
                                    v = _a.sent();
                                    success = v.success;
                                    if (!success) {
                                        throw new ApolloError("Validation Errors", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 7]);
                                    return [4, userModel.findOne({ email: args.email })];
                                case 3:
                                    user = _a.sent();
                                    if (!user) {
                                        throw new ApolloError("User not found", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
                                    return [4, forgetPasswordModel.create({
                                            token: token,
                                            email: args.email,
                                            expireDate: "" + moment().add('30', 'minutes').valueOf()
                                        })];
                                case 4:
                                    _a.sent();
                                    return [4, index_1.sendEmail('requestPasswordResetToken.hbs', {
                                            email: args.email,
                                            returnUrl: process.env.FRONTEND_APP_URL,
                                            token: token,
                                            frontendAppPasswordResetUrl: process.env.FRONTEND_APP_PASSWORD_RESET_URL,
                                            nextMinutes: moment().add('30', 'minutes').format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            siteName: process.env.NAME
                                        }, {
                                            from: process.env.MAILER_SERVICE_USERNAME,
                                            to: args.email,
                                            subject: "Reset your email"
                                        }, null, null)];
                                case 5:
                                    _a.sent();
                                    return [2, {
                                            email: args.email,
                                            successMessageType: "Successfull",
                                            successMessage: "Please check your email. We have sent a link to reset your email",
                                            statusCode: statusCodes_1["default"].CREATED.type
                                        }];
                                case 6:
                                    e_2 = _a.sent();
                                    return [2, internalServerError_1["default"](e_2)];
                                case 7: return [2];
                            }
                        });
                    }); },
                    resetPassword: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, success, forgetPassword, user, hash, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].resetPassword, args)];
                                case 1:
                                    v = _a.sent();
                                    success = v.success;
                                    if (!success) {
                                        throw new ApolloError("Validation Errors", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 8, , 9]);
                                    return [4, forgetPasswordModel.findOne({ token: args.token })];
                                case 3:
                                    forgetPassword = _a.sent();
                                    if (!forgetPassword) {
                                        throw new ApolloError("Token Expired", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    return [4, userModel.findOne({ email: forgetPassword.email })];
                                case 4:
                                    user = _a.sent();
                                    if (!forgetPassword) {
                                        throw new ApolloError("User not foundd", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    hash = bcrypt.hashSync(args.password);
                                    return [4, user.update({
                                            password: hash
                                        })];
                                case 5:
                                    _a.sent();
                                    return [4, forgetPasswordModel["delete"](forgetPassword)];
                                case 6:
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
                                case 7:
                                    _a.sent();
                                    return [2, {
                                            successMessageType: "Success",
                                            successMessage: "Password successfully changed",
                                            statusCode: statusCodes_1["default"].OK.type,
                                            statusCodeNumber: statusCodes_1["default"].OK.number
                                        }];
                                case 8:
                                    e_3 = _a.sent();
                                    return [2, internalServerError_1["default"](e_3)];
                                case 9: return [2];
                            }
                        });
                    }); }
                }
            });
        }
    };
});
//# sourceMappingURL=resolvers.js.map