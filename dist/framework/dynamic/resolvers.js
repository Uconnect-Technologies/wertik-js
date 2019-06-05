System.register(["./../validations/validate", "./../helpers/internalServerError", "./../helpers/statusCodes"], function (exports_1, context_1) {
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
    var ApolloError, validate_1, internalServerError_1, statusCodes_1;
    var __moduleName = context_1 && context_1.id;
    function default_1(info) {
        var _a, _b;
        var _this = this;
        var moduleName = info.moduleName, validations = info.validations, model = info.model;
        return {
            queries: (_a = {},
                _a["list" + moduleName] = function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4, model.paginate(args)];
                            case 1: return [2, _a.sent()];
                            case 2:
                                e_1 = _a.sent();
                                return [2, internalServerError_1["default"](e_1)];
                            case 3: return [2];
                        }
                    });
                }); },
                _a["view" + moduleName] = function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var v, success, view, e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, validate_1["default"](validations.view, args.input)];
                            case 1:
                                v = _a.sent();
                                success = v.success;
                                if (!success) {
                                    throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                }
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4, model.view(args.input)];
                            case 3:
                                view = _a.sent();
                                if (!view) {
                                    throw new ApolloError(moduleName + " not found", statusCodes_1["default"].NOT_FOUND.number);
                                }
                                return [2, view];
                            case 4:
                                e_2 = _a.sent();
                                return [2, internalServerError_1["default"](e_2)];
                            case 5: return [2];
                        }
                    });
                }); },
                _a),
            mutations: (_b = {},
                _b["updateBulk" + moduleName] = function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2, args.input.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var v, success, e_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, validate_1["default"](validations.update, e)];
                                        case 1:
                                            v = _a.sent();
                                            success = v.success;
                                            if (!success) {
                                                throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                            }
                                            _a.label = 2;
                                        case 2:
                                            _a.trys.push([2, 4, , 5]);
                                            return [4, model.update(e)];
                                        case 3: return [2, _a.sent()];
                                        case 4:
                                            e_3 = _a.sent();
                                            return [2, internalServerError_1["default"](e_3)];
                                        case 5: return [2];
                                    }
                                });
                            }); })];
                    });
                }); },
                _b["deleteBulk" + moduleName] = function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2, args.input.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var v, success, e_4;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, validate_1["default"](validations["delete"], item)];
                                        case 1:
                                            v = _a.sent();
                                            success = v.success;
                                            if (!success) {
                                                throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                            }
                                            _a.label = 2;
                                        case 2:
                                            _a.trys.push([2, 4, , 5]);
                                            return [4, model["delete"](item)];
                                        case 3: return [2, _a.sent()];
                                        case 4:
                                            e_4 = _a.sent();
                                            return [2, internalServerError_1["default"](e_4)];
                                        case 5: return [2];
                                    }
                                });
                            }); })];
                    });
                }); },
                _b["createBulk" + moduleName] = function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2, args.input.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var v, success, e_5;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, validate_1["default"](validations.create, e)];
                                        case 1:
                                            v = _a.sent();
                                            success = v.success;
                                            if (!success) {
                                                throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                            }
                                            _a.label = 2;
                                        case 2:
                                            _a.trys.push([2, 4, , 5]);
                                            return [4, model.create(e)];
                                        case 3: return [2, _a.sent()];
                                        case 4:
                                            e_5 = _a.sent();
                                            return [2, internalServerError_1["default"](e_5)];
                                        case 5: return [2];
                                    }
                                });
                            }); })];
                    });
                }); },
                _b["create" + moduleName] = function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var v, success, e_6;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, validate_1["default"](validations.create, args.input)];
                            case 1:
                                v = _a.sent();
                                success = v.success;
                                if (!success) {
                                    throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                }
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4, model.create(args.input)];
                            case 3: return [2, _a.sent()];
                            case 4:
                                e_6 = _a.sent();
                                return [2, internalServerError_1["default"](e_6)];
                            case 5: return [2];
                        }
                    });
                }); },
                _b["update" + moduleName] = function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var v, success, e_7;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, validate_1["default"](validations.update, args.input)];
                            case 1:
                                v = _a.sent();
                                success = v.success;
                                if (!success) {
                                    throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                }
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4, model.update(args.input)];
                            case 3: return [2, _a.sent()];
                            case 4:
                                e_7 = _a.sent();
                                return [2, internalServerError_1["default"](e_7)];
                            case 5: return [2];
                        }
                    });
                }); },
                _b["delete" + moduleName] = function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var v, success, e_8;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, validate_1["default"](validations["delete"], args.input)];
                            case 1:
                                v = _a.sent();
                                success = v.success;
                                if (!success) {
                                    throw new ApolloError("Validation error", statusCodes_1["default"].BAD_REQUEST.number, { list: v.errors });
                                }
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4, model["delete"](args.input)];
                            case 3: return [2, _a.sent()];
                            case 4:
                                e_8 = _a.sent();
                                return [2, internalServerError_1["default"](e_8)];
                            case 5: return [2];
                        }
                    });
                }); },
                _b)
        };
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (validate_1_1) {
                validate_1 = validate_1_1;
            },
            function (internalServerError_1_1) {
                internalServerError_1 = internalServerError_1_1;
            },
            function (statusCodes_1_1) {
                statusCodes_1 = statusCodes_1_1;
            }
        ],
        execute: function () {
            ApolloError = require("apollo-server").ApolloError;
        }
    };
});
//# sourceMappingURL=resolvers.js.map