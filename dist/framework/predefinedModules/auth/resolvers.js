System.register(["./../../../framework/helpers/internalServerError", "./validations", "./../../../framework/security/createJwtToken", "./../../../framework/security/isTokenExpired", "./../../../framework/validations/validate", "./../../../framework/helpers/statusCodes", "./../../../framework/mailer/index", "./../../../framework/helpers/getIdName", "./../../../framework/dynamic/allModels"], function (exports_1, context_1) {
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
    var _this, bcrypt, moment, get, ApolloError, internalServerError_1, validations_1, createJwtToken_1, isTokenExpired_1, validate_1, statusCodes_1, index_1, getIdName_1, allModels_1, userModel, profileModel;
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
            function (createJwtToken_1_1) {
                createJwtToken_1 = createJwtToken_1_1;
            },
            function (isTokenExpired_1_1) {
                isTokenExpired_1 = isTokenExpired_1_1;
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
            }
        ],
        execute: function () {
            bcrypt = require("bcrypt-nodejs");
            moment = require("moment");
            get = require("lodash").get;
            ApolloError = require("apollo-server").ApolloError;
            userModel = allModels_1["default"].userModel, profileModel = allModels_1["default"].profileModel;
            exports_1("default", {
                queries: {},
                mutations: {
                    loginWithAccessToken: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, user, _a, _b, _c, e_1;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].loginWithAccessToken, args.input)];
                                case 1:
                                    v = _d.sent();
                                    if (!v.success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _d.label = 2;
                                case 2:
                                    _d.trys.push([2, 7, , 8]);
                                    return [4, userModel.findOne({ accessToken: args.input.accessToken })];
                                case 3:
                                    user = _d.sent();
                                    if (!user) {
                                        throw new ApolloError("Incorrect Access Token", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    if (!isTokenExpired_1["default"](user.accessToken)) return [3, 6];
                                    _b = (_a = user).update;
                                    _c = {};
                                    return [4, createJwtToken_1["default"]({ email: user.email, "for": "authentication" })];
                                case 4: return [4, _b.apply(_a, [(_c.accessToken = _d.sent(),
                                            _c)])];
                                case 5:
                                    _d.sent();
                                    _d.label = 6;
                                case 6: return [2, user];
                                case 7:
                                    e_1 = _d.sent();
                                    return [2, internalServerError_1["default"](e_1)];
                                case 8: return [2];
                            }
                        });
                    }); },
                    twoFactorLogin: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, success, user, twoFactorCode, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].twoFactorLogin, args.input)];
                                case 1:
                                    v = _a.sent();
                                    success = v.success;
                                    if (!success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 7]);
                                    return [4, userModel.findOne({ email: args.input.email })];
                                case 3:
                                    user = _a.sent();
                                    if (!user) {
                                        throw new ApolloError("User Not found", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    twoFactorCode = Math.floor(Math.random() * 100000);
                                    return [4, user.update({
                                            twoFactorCode: twoFactorCode
                                        })];
                                case 4:
                                    _a.sent();
                                    return [4, index_1.sendEmail('twoFactorLogin.hbs', {
                                            twoFactorCode: twoFactorCode,
                                            siteName: process.env.NAME,
                                            userName: user.email
                                        }, {
                                            from: process.env.MAILER_SERVICE_USERNAME,
                                            to: get(args, 'input.email', ''),
                                            subject: process.env.NAME + " Two Factor Authorization"
                                        }, null, null)];
                                case 5:
                                    _a.sent();
                                    return [2, {
                                            successMessageType: "Success",
                                            successMessage: "Email Sent"
                                        }];
                                case 6:
                                    e_2 = _a.sent();
                                    return [2, internalServerError_1["default"](e_2)];
                                case 7: return [2];
                            }
                        });
                    }); },
                    twoFactorLoginValidate: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, success, user, token, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].twoFactorLoginValidate, args.input)];
                                case 1:
                                    v = _a.sent();
                                    success = v.success;
                                    if (!success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 7]);
                                    return [4, userModel.findOne({ twoFactorCode: args.input.twoFactorCode })];
                                case 3:
                                    user = _a.sent();
                                    if (!user) {
                                        throw new ApolloError("User Not found", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    return [4, createJwtToken_1["default"]({ email: user.email, "for": "authentication" })];
                                case 4:
                                    token = _a.sent();
                                    return [4, user.update({
                                            accessToken: token,
                                            twoFactorCode: ""
                                        })];
                                case 5:
                                    _a.sent();
                                    user.accessToken = token;
                                    user.successMessage = "Success";
                                    user.successMessageType = "You are successfully logged in";
                                    user.statusCode = statusCodes_1["default"].OK.type;
                                    user.statusCodeNumber = statusCodes_1["default"].OK.number;
                                    return [2, user];
                                case 6:
                                    e_3 = _a.sent();
                                    return [2, internalServerError_1["default"](e_3)];
                                case 7: return [2];
                            }
                        });
                    }); },
                    activateAccount: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, success, user, e_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].activateAccount, args.input)];
                                case 1:
                                    v = _a.sent();
                                    success = v.success;
                                    if (!success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 7]);
                                    return [4, userModel.findOne({ activationToken: args.input.activationToken })];
                                case 3:
                                    user = _a.sent();
                                    if (!user) {
                                        throw new ApolloError("Not found", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    return [4, user.update({
                                            activationToken: "",
                                            isActivated: true,
                                            activatedOn: moment().valueOf()
                                        })];
                                case 4:
                                    _a.sent();
                                    return [4, index_1.sendEmail('accountActivated.hbs', {
                                            username: user.email,
                                            siteName: process.env.NAME
                                        }, {
                                            from: process.env.MAILER_SERVICE_USERNAME,
                                            to: user.email,
                                            subject: "Welcome to " + process.env.NAME
                                        }, null, null)];
                                case 5:
                                    _a.sent();
                                    return [2, {
                                            statusCode: statusCodes_1["default"].OK.type,
                                            statusCodeNumber: statusCodes_1["default"].OK.number,
                                            successMessage: "Success",
                                            successMessageType: "Account successfully isActivated"
                                        }];
                                case 6:
                                    e_4 = _a.sent();
                                    return [2, internalServerError_1["default"](e_4)];
                                case 7: return [2];
                            }
                        });
                    }); },
                    login: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, success, _a, email, password, user, findEmail, comparePassword, token, e_5;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].login, args.input)];
                                case 1:
                                    v = _b.sent();
                                    success = v.success;
                                    if (!success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 6, , 7]);
                                    _a = args.input, email = _a.email, password = _a.password;
                                    return [4, userModel.findOne({ email: email })];
                                case 3:
                                    user = _b.sent();
                                    findEmail = get(user, 'email', null);
                                    if (!findEmail) {
                                        throw new ApolloError("Not found", statusCodes_1["default"].NOT_FOUND.number);
                                    }
                                    comparePassword = bcrypt.compareSync(password, user.password);
                                    if (!comparePassword) {
                                        throw new ApolloError("Incorrect Password", statusCodes_1["default"].BAD_REQUEST.number);
                                    }
                                    return [4, createJwtToken_1["default"]({ email: email, "for": "authentication" })];
                                case 4:
                                    token = _b.sent();
                                    return [4, user.update({
                                            accessToken: token
                                        })];
                                case 5:
                                    _b.sent();
                                    user.accessToken = token;
                                    user.successMessage = "Success";
                                    user.successMessageType = "You are successfully logged in";
                                    user.statusCode = statusCodes_1["default"].OK.type;
                                    user.statusCodeNumber = statusCodes_1["default"].OK.number;
                                    return [2, user];
                                case 6:
                                    e_5 = _b.sent();
                                    return [2, internalServerError_1["default"](e_5)];
                                case 7: return [2];
                            }
                        });
                    }); },
                    signup: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, _a, email, password, confirmPassword, user, hash, newUser, _b, _c, _d, e_6;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].signup, args.input)];
                                case 1:
                                    v = _e.sent();
                                    if (!v.success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _e.label = 2;
                                case 2:
                                    _e.trys.push([2, 9, , 10]);
                                    _a = args.input, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                                    return [4, userModel.findOne({
                                            email: email
                                        })];
                                case 3:
                                    user = _e.sent();
                                    if (user)
                                        throw new ApolloError("Email is already used", statusCodes_1["default"].BAD_REQUEST.number);
                                    hash = bcrypt.hashSync(password);
                                    _c = (_b = userModel).create;
                                    _d = {
                                        email: email,
                                        referer: get(args.input, 'referer', ''),
                                        superUser: false,
                                        name: get(args.input, 'name', '')
                                    };
                                    return [4, createJwtToken_1["default"]({ email: email, "for": "authentication" })];
                                case 4:
                                    _d.accessToken = _e.sent();
                                    return [4, createJwtToken_1["default"]({ email: email, "for": "refreshToken" })];
                                case 5: return [4, _c.apply(_b, [(_d.refreshToken = _e.sent(),
                                            _d.isActivated = false,
                                            _d.isSuperUser = get(args.input, 'isSuperUser', false),
                                            _d.activationToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
                                            _d.password = hash,
                                            _d)])];
                                case 6:
                                    newUser = _e.sent();
                                    return [4, index_1.sendEmail('welcome.hbs', {
                                            email: newUser.email,
                                            username: newUser.email,
                                            date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            siteName: process.env.NAME,
                                            activationUrl: process.env.FRONTEND_APP_URL + "/activate-account/",
                                            activationToken: newUser.activationToken
                                        }, {
                                            from: process.env.MAILER_SERVICE_USERNAME,
                                            to: newUser.email,
                                            subject: "Welcome to " + process.env.NAME
                                        }, null, null)];
                                case 7:
                                    _e.sent();
                                    return [4, profileModel.create({
                                            description: '...',
                                            user: newUser[getIdName_1["default"]]
                                        })];
                                case 8:
                                    _e.sent();
                                    newUser.statusCode = statusCodes_1["default"].OK.type;
                                    newUser.statusCodeNumber = statusCodes_1["default"].OK.number;
                                    newUser.successMessageType = "Registered";
                                    newUser.successMessage = "New user successfully created";
                                    return [2, newUser];
                                case 9:
                                    e_6 = _e.sent();
                                    return [2, internalServerError_1["default"](e_6)];
                                case 10: return [2];
                            }
                        });
                    }); },
                    refreshToken: function (_, args, g) { return __awaiter(_this, void 0, void 0, function () {
                        var v, user, token, e_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, validate_1["default"](validations_1["default"].refreshToken, args.input)];
                                case 1:
                                    v = _a.sent();
                                    if (!v.success) {
                                        throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 7]);
                                    return [4, userModel.findOne({
                                            refreshToken: get(args, 'input.refreshToken', '')
                                        })];
                                case 3:
                                    user = _a.sent();
                                    if (!user) {
                                        throw new ApolloError("Refresh Token is Incorrect, please login again.", statusCodes_1["default"].BAD_REQUEST.number);
                                    }
                                    return [4, createJwtToken_1["default"]({ email: user.email, "for": "authentication" })];
                                case 4:
                                    token = _a.sent();
                                    return [4, user.update({
                                            accessToken: token
                                        })];
                                case 5:
                                    _a.sent();
                                    user.statusCode = statusCodes_1["default"].OK.type;
                                    user.statusCodeNumber = statusCodes_1["default"].OK.number;
                                    user.successMessageType = "Success";
                                    user.successMessage = "Access token refreshed";
                                    return [2, user];
                                case 6:
                                    e_7 = _a.sent();
                                    return [2, internalServerError_1["default"](e_7)];
                                case 7: return [2];
                            }
                        });
                    }); }
                }
            });
        }
    };
});
//# sourceMappingURL=resolvers.js.map