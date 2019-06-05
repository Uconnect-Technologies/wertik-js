System.register(["./validations", "./../../../framework/dynamic/index", "./../../../framework/dynamic/allModels", "./../../../framework/database/relateResolver"], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
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
    var validations_1, index_1, allModels_1, relateResolver_1, roleModel, rolePermissionsModel, roleResolver;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (validations_1_1) {
                validations_1 = validations_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (allModels_1_1) {
                allModels_1 = allModels_1_1;
            },
            function (relateResolver_1_1) {
                relateResolver_1 = relateResolver_1_1;
            }
        ],
        execute: function () {
            roleModel = allModels_1["default"].roleModel, rolePermissionsModel = allModels_1["default"].rolePermissionsModel;
            roleResolver = index_1["default"].resolvers({
                moduleName: 'Role',
                validations: {
                    create: validations_1["default"].createRole,
                    "delete": validations_1["default"].deleteRole,
                    update: validations_1["default"].updateRole,
                    view: validations_1["default"].role
                },
                model: roleModel
            });
            exports_1("default", {
                Role: {
                    permissions: function (role) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, relateResolver_1["default"](rolePermissionsModel, role, 'permission', true)];
                                    case 1: return [2, _a.sent()];
                                }
                            });
                        });
                    }
                },
                mutations: __assign({}, index_1["default"].loader("Role", roleResolver).mutations),
                queries: __assign({}, index_1["default"].loader("Role", roleResolver).queries)
            });
        }
    };
});
//# sourceMappingURL=resolvers.js.map