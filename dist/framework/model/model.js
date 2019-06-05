System.register(["./actions/index", "./../../framework/helpers/internalServerError"], function (exports_1, context_1) {
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
    var get, index_1, internalServerError_1, create, update, destroy, findOne, view, paginate, Model;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (internalServerError_1_1) {
                internalServerError_1 = internalServerError_1_1;
            }
        ],
        execute: function () {
            get = require("lodash").get;
            create = index_1["default"].create, update = index_1["default"].update, destroy = index_1["default"].destroy, findOne = index_1["default"].findOne, view = index_1["default"].view, paginate = index_1["default"].paginate;
            Model = (function () {
                function Model(props) {
                    this.instance = null;
                    this.tableName = props.tableName;
                    this.models = props.models;
                    this.model = this.models[this.tableName];
                }
                Model.prototype["delete"] = function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var fakeResponse, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    fakeResponse = {};
                                    return [4, destroy(this.model, args)];
                                case 1:
                                    _a.sent();
                                    fakeResponse.successMessageType = "Success";
                                    fakeResponse.successMessage = this.tableName + " deleted";
                                    return [2, fakeResponse];
                                case 2:
                                    e_1 = _a.sent();
                                    return [2, internalServerError_1["default"](e_1)];
                                case 3: return [2];
                            }
                        });
                    });
                };
                Model.prototype.create = function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var fakeResponse, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4, create(this.model, args, '')];
                                case 1:
                                    fakeResponse = _a.sent();
                                    fakeResponse.successMessageType = "Success";
                                    fakeResponse.successMessage = this.tableName + " created";
                                    return [2, fakeResponse];
                                case 2:
                                    e_2 = _a.sent();
                                    return [2, internalServerError_1["default"](e_2)];
                                case 3: return [2];
                            }
                        });
                    });
                };
                Model.prototype.update = function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4, update(this.model, args)];
                                case 1:
                                    response = _a.sent();
                                    response.successMessageType = "Success";
                                    response.successMessage = this.tableName + " updated";
                                    return [2, response];
                                case 2:
                                    e_3 = _a.sent();
                                    return [2, internalServerError_1["default"](e_3)];
                                case 3: return [2];
                            }
                        });
                    });
                };
                Model.prototype.view = function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, e_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4, view(this.model, args)];
                                case 1:
                                    response = _a.sent();
                                    if (!response) {
                                        return [2, null];
                                    }
                                    response.successMessageType = "Success";
                                    response.successMessage = this.tableName + " fetched";
                                    return [2, response];
                                case 2:
                                    e_4 = _a.sent();
                                    return [2, internalServerError_1["default"](e_4)];
                                case 3: return [2];
                            }
                        });
                    });
                };
                Model.prototype.findOne = function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, e_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4, findOne(this.model, args)];
                                case 1:
                                    response = _a.sent();
                                    if (!response) {
                                        return [2, null];
                                    }
                                    response.successMessageType = "Success";
                                    response.successMessage = this.tableName + " fetched";
                                    return [2, response];
                                case 2:
                                    e_5 = _a.sent();
                                    return [2, internalServerError_1["default"](e_5)];
                                case 3: return [2];
                            }
                        });
                    });
                };
                Model.prototype.paginate = function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, e_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4, paginate(this.model, args)];
                                case 1:
                                    response = _a.sent();
                                    return [2, response];
                                case 2:
                                    e_6 = _a.sent();
                                    return [2, internalServerError_1["default"](e_6)];
                                case 3: return [2];
                            }
                        });
                    });
                };
                Model.prototype.getInstance = function () {
                    return get(this, 'instance', null);
                };
                return Model;
            }());
            exports_1("default", Model);
        }
    };
});
//# sourceMappingURL=model.js.map