"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let { ApolloServer } = require("apollo-server");
const loadAllModules_1 = __importDefault(require("./loadAllModules"));
const lodash_1 = require("lodash");
const index_1 = __importDefault(require("./voyager/index"));
const index_2 = require("../defaults/options/index");
const { ApolloServer } = require("apollo-server-express");
const auth = __importStar(require("./../helpers/auth"));
//expressApp,configuration,models,emailTemplates,sendEmail,database,WertikEventEmitter
function default_1(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { mailerInstance, configuration, models, sendEmail, emailTemplates, database, socketio, logger, cache } = options;
        const apolloGraphqlOptions = lodash_1.get(configuration, "graphql.apolloGraphqlServerOptions", index_2.defaultApolloGraphqlOptions);
        let initializeContext = lodash_1.get(configuration, "context.initializeContext", function () {
            return __awaiter(this, void 0, void 0, function* () { });
        });
        initializeContext = yield initializeContext("graphql", {
            models,
            database,
        });
        const modules = yield loadAllModules_1.default(configuration);
        const graphqlVoyager = index_1.default(configuration);
        const apollo = new ApolloServer(Object.assign({ typeDefs: modules.schema, resolvers: modules.resolvers, context: ({ req, res, connection }) => __awaiter(this, void 0, void 0, function* () {
                let cxt = {
                    wertik: {
                        database: database,
                        auth: {
                            helpers: auth,
                        },
                        models,
                        sendEmail: sendEmail,
                        emailTemplates: emailTemplates,
                        mailerInstance: mailerInstance,
                        cache,
                        req,
                        res,
                        socketio,
                        logger,
                        initializeContext: initializeContext,
                        configuration: configuration
                    }
                };
                let requestContext = yield lodash_1.get(configuration.context, "requestContext", () => { })("graphql", cxt);
                cxt["requestContext"] = requestContext;
                return cxt;
            }) }, apolloGraphqlOptions));
        return {
            graphql: apollo,
            graphqlVoyager: graphqlVoyager,
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map