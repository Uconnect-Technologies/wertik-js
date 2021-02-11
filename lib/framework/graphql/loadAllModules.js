"use strict";
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
/*
    This is all where GraphQL thing happens. This file loads all graphql schemas from the app.
*/
const lodash_1 = require("lodash");
const generalSchema_1 = __importDefault(require("./generalSchema"));
const crudGenerator_1 = require("./crudGenerator");
const apollo_server_1 = require("apollo-server");
const graphql_1 = require("../moduleRelationships/graphql");
const self_1 = __importDefault(require("./self"));
const pubsub = new apollo_server_1.PubSub();
function default_1(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        let modulesSchema = `
    ${self_1.default.schema}
  `;
        let modulesQuerySchema = `
  ${self_1.default.queries.schema}
  `;
        let modulesMutationSchema = `
    ${self_1.default.mutations.schema}
  `;
        let modulesSubscriptionSchema = ``;
        let modules = process.env.builtinModules.split(",");
        modules = modules.filter((c) => c);
        modules = [...modules, ...lodash_1.get(configuration, "modules", [])];
        let response = () => {
            return {
                message: "Welcome to wertik, You are successfully running Wertik.",
                version: require("../../../package.json").version,
            };
        };
        let schemaMap = require("./schemaMap").default;
        let appMutations = Object.assign({}, self_1.default.mutations.resolvers);
        let appQueries = Object.assign({}, self_1.default.queries.resolvers);
        let appSubscriptions = {};
        let appCustomResolvers = {};
        const processModule = function (currentModule) {
            if (currentModule && currentModule.hasOwnProperty("graphql")) {
                // Process Module Graphql
                const moduleGraphql = currentModule.graphql;
                const useDatabase = lodash_1.get(currentModule, "useDatabase", true);
                const currentModuleName = currentModule.name;
                const currentModuleGraphqlSchema = lodash_1.get(moduleGraphql, "schema", "");
                const currentModuleGraphqlQuerySchema = lodash_1.get(moduleGraphql, "query.schema", "");
                const currentModuleGraphqlQueryResolvers = lodash_1.get(moduleGraphql, "query.resolvers", {});
                const currentModuleGraphqlMutationSchema = lodash_1.get(moduleGraphql, "mutation.schema", "");
                const currentModuleGraphqlMutationResolvers = lodash_1.get(moduleGraphql, "mutation.resolvers", {});
                const customResolvers = lodash_1.get(moduleGraphql, "customResolvers", {});
                modulesSchema = `${modulesSchema}
        ${currentModuleGraphqlSchema}`;
                modulesQuerySchema = `${modulesQuerySchema}
        ${currentModuleGraphqlQuerySchema}`;
                appQueries = Object.assign(Object.assign({}, appQueries), currentModuleGraphqlQueryResolvers);
                modulesMutationSchema = `${modulesMutationSchema}
        ${currentModuleGraphqlMutationSchema}`;
                appMutations = Object.assign(Object.assign({}, appMutations), currentModuleGraphqlMutationResolvers);
                appCustomResolvers[currentModuleName] = Object.assign(Object.assign({}, customResolvers), graphql_1.GraphQLModuleRelationMapper(currentModule));
                // Process Module Graphql
                // Process Crud for Module:
                if (useDatabase === true) {
                    let currentModuleListSchema = crudGenerator_1.generateListTypeForModule(currentModule);
                    modulesSchema = `${modulesSchema}
        ${currentModuleListSchema}`;
                    const crudResolvers = crudGenerator_1.generateCrudResolvers(currentModule, pubsub, configuration);
                    const crudMutationSchema = crudGenerator_1.generateMutationsCrudSchema(currentModuleName);
                    const crudMutationResolvers = crudResolvers.mutations;
                    const crudQuerySchema = crudGenerator_1.generateQueriesCrudSchema(currentModuleName);
                    const crudQueryResolvers = crudResolvers.queries;
                    const crudSubscriptionSchema = crudGenerator_1.generateMutationsCrudSubscriptionSchema(currentModuleName);
                    const crudSubscriptionResolvers = crudGenerator_1.generateSubscriptionsCrudResolvers(currentModuleName, pubsub);
                    modulesQuerySchema = `${modulesQuerySchema}
        ${crudQuerySchema}
        `;
                    appQueries = Object.assign(Object.assign({}, appQueries), crudQueryResolvers);
                    modulesMutationSchema = `${modulesMutationSchema}
        ${crudMutationSchema}`;
                    appMutations = Object.assign(Object.assign({}, appMutations), crudMutationResolvers);
                    modulesSubscriptionSchema =
                        modulesSubscriptionSchema + crudSubscriptionSchema;
                    appSubscriptions = Object.assign(Object.assign({}, appSubscriptions), crudSubscriptionResolvers);
                }
                // Check for empty resolvers and remove them
                const totalResolvers = Object.keys(lodash_1.get(appCustomResolvers, currentModuleName, {})).length;
                // cosnoel
                if (totalResolvers === 0) {
                    delete appCustomResolvers[currentModuleName];
                }
                // Process Crud for module:
            }
        };
        modules.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            let module;
            if (element.constructor === String) {
                module = require(`./../builtinModules/${element}/index`).default;
            }
            else if (element.constructor === Object || lodash_1.isFunction(element)) {
                if (element.constructor == Function) {
                    module = yield element(configuration);
                }
                else {
                    module = element;
                }
            }
            processModule(module);
        }));
        schemaMap = schemaMap.replace("[generalSchema__replace]", generalSchema_1.default);
        schemaMap = schemaMap.replace("[modulesSchema__replace]", modulesSchema);
        schemaMap = schemaMap.replace("[mutation__replace]", modulesMutationSchema);
        schemaMap = schemaMap.replace("[query__replace]", modulesQuerySchema);
        schemaMap = schemaMap.replace("[subscription__replace]", modulesSubscriptionSchema);
        return {
            schema: schemaMap,
            resolvers: Object.assign({ Mutation: Object.assign(Object.assign({}, appMutations), { response: response }), Query: Object.assign(Object.assign({}, appQueries), { response: response }), Subscription: Object.assign({}, appSubscriptions) }, appCustomResolvers),
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=loadAllModules.js.map