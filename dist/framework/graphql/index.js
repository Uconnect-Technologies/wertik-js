System.register(["./loadAllMutations", "./loadAllQueries", "./loadAllResolvers", "./loadAllSchemas", "./../../app/generalSchema"], function (exports_1, context_1) {
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
    var buildSchema, _a, ApolloServer, gql, loadAllMutations_1, loadAllQueries_1, loadAllResolvers_1, loadAllSchemas_1, generalSchema_1;
    var __moduleName = context_1 && context_1.id;
    function default_1(rootDirectory, app) {
        var _this = this;
        var allMutations = loadAllMutations_1["default"](rootDirectory);
        var allQueries = loadAllQueries_1["default"](rootDirectory);
        var allSchemas = loadAllSchemas_1["default"](rootDirectory);
        var allResolvers = loadAllResolvers_1["default"](rootDirectory);
        var validateAccessToken = require(rootDirectory + "/framework/predefinedModules/user/auth")["default"].validateAccessToken;
        var mainSchema = "\n\t\t" + generalSchema_1["default"] + "\n\t\t" + allSchemas + "\n\n\t\ttype Mutation {\n\t\t\t" + allMutations + "\n\t\t}\n\t\ttype Query {\n\t\t\t" + allQueries + "\n\t\t}\n\t\tschema {\n\t\t\tquery: Query\n\t\t\tmutation: Mutation\n\t\t}\n\t";
        var schema = buildSchema(mainSchema);
        var server = new ApolloServer({
            typeDefs: mainSchema,
            resolvers: allResolvers,
            context: function (a) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, validateAccessToken(a.req)];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }); }
        });
        server.listen(1209).then(function (a) {
            console.log("Server ready at " + a.url);
        });
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (loadAllMutations_1_1) {
                loadAllMutations_1 = loadAllMutations_1_1;
            },
            function (loadAllQueries_1_1) {
                loadAllQueries_1 = loadAllQueries_1_1;
            },
            function (loadAllResolvers_1_1) {
                loadAllResolvers_1 = loadAllResolvers_1_1;
            },
            function (loadAllSchemas_1_1) {
                loadAllSchemas_1 = loadAllSchemas_1_1;
            },
            function (generalSchema_1_1) {
                generalSchema_1 = generalSchema_1_1;
            }
        ],
        execute: function () {
            buildSchema = require("graphql").buildSchema;
            _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
        }
    };
});
//# sourceMappingURL=index.js.map