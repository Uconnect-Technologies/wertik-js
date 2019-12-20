/*
    This is all where GraphQL thing happens. This file loads all graphql schemas from the app.
*/

const { get } = require("lodash");
import generalSchema from "./generalSchema";
import {
  generateSubscriptionsCrudResolvers,
  generateQueriesCrudSchema,
  generateListTypeForModule,
  generateMutationsCrudSubscriptionSchema,
  generateMutationsCrudSchema,
  generateCrudResolvers
} from "./crudGenerator";
let { PubSub } = require("apollo-server");
import { checkIfModuleIsValid } from "./../helpers/index";
const pubsub = new PubSub();

export default function(configuration) {
  let modulesSchema = ``;
  let modulesQuerySchema = ``;
  let modulesMutationSchema = ``;
  let modulesSubscriptionSchema = ``;
  let modules = process.env.builtinModules.split(",");
  modules = [...modules, ...get(configuration, "modules", [])];
  let response = () => {
    return {
      message: require("../../../package.json").welcomeResponse,
      version: require("../../../package.json").version
    };
  };
  let schemaMap = `
        type Response {
            message: String
            version: String
        }
        type SuccessReponse {
            message: String
        }
        [generalSchema__replace]
        [modulesSchema__replace]
        type Mutation {
            response: Response 
            [mutation__replace]
        }
        type Query {
            response: Response
            [query__replace]
        }
        type Subscription {
            [subscription__replace]
        }
        input EmailInput {
            email: String!
        }
        input SignupInput {
            email: String!
            password: String!
            confirmPassword: String!
        }
        schema {
            query: Query
            mutation: Mutation
            subscription: Subscription
        }
    `;

  let appMutations = {};
  let appQueries = {};
  let appSubscriptions = {};
  let appRelations = {};

  const processModule = function(module) {
    let graphql = module.graphql;
    let moduleName = module.name;
    let schema = graphql.schema;
    let currentGenerateQuery = get(graphql, "crud.query.generate", true);
    let currentGenerateQueryOperations = get(graphql, "crud.queries.operations", "*");
    let currentGenerateMutation = get(graphql, "crud.mutation.generate", true);
    let currentGenerateMutationOperations = get(graphql, "crud.mutation.operations", "*");
    let currentMutationSchema = get(graphql, "mutation.schema", "");
    let currentMutationResolvers = get(graphql, "mutation.resolvers", {});
    let currentQuerySchema = get(graphql, "query.schema", "");
    let currentQueryResolvers = get(graphql, "query.resolvers", {});
    let currentModuleCrudResolvers = generateCrudResolvers(moduleName, pubsub);
    let currentModuleListSchema =
      currentGenerateQuery || currentGenerateMutation ? generateListTypeForModule(moduleName) : "";
    let currentModuleSubscriptionResolvers = generateSubscriptionsCrudResolvers(moduleName, pubsub);
    // relations
    let relations = get(graphql, "relations", {});
    if (module.name !== "Auth") {
      appRelations[module.name] = relations;
    }
    // relations
    // require information
    // crud
    if (currentGenerateQuery) {
      modulesQuerySchema = modulesQuerySchema + generateQueriesCrudSchema(moduleName);
      appQueries = { ...appQueries, ...currentModuleCrudResolvers.queries };
    }
    if (currentGenerateMutation) {
      modulesMutationSchema = modulesMutationSchema + generateMutationsCrudSchema(moduleName);
      appMutations = { ...appMutations, ...currentModuleCrudResolvers.mutations };
    }
    // crud
    // Subscription

    let currentModuleCrudSubscription = currentGenerateMutation
      ? generateMutationsCrudSubscriptionSchema(moduleName)
      : "";
    // Subscription
    modulesSchema = modulesSchema + schema;
    modulesSchema = modulesSchema + currentModuleListSchema;
    modulesQuerySchema = modulesQuerySchema + currentQuerySchema;
    modulesMutationSchema = modulesMutationSchema + currentMutationSchema;
    modulesSubscriptionSchema = modulesSubscriptionSchema + currentModuleCrudSubscription;
    appQueries = { ...appQueries, ...currentQueryResolvers };
    appMutations = { ...appMutations, ...currentMutationResolvers };
    if (currentGenerateMutation) {
      appSubscriptions = { ...appSubscriptions, ...currentModuleSubscriptionResolvers };
    }
  };

  modules.forEach(element => {
    let module;
    if (element.constructor === String) {
      module = require(`./../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object) {
      module = element;
    }
    processModule(module);
  });

  schemaMap = schemaMap.replace("[generalSchema__replace]", generalSchema);
  schemaMap = schemaMap.replace("[modulesSchema__replace]", modulesSchema);
  schemaMap = schemaMap.replace("[mutation__replace]", modulesMutationSchema);
  schemaMap = schemaMap.replace("[query__replace]", modulesQuerySchema);
  schemaMap = schemaMap.replace("[subscription__replace]", modulesSubscriptionSchema);

  return {
    schema: schemaMap,
    resolvers: {
      Mutation: {
        ...appMutations,
        response: response
      },
      Query: {
        ...appQueries,
        response: response
      },
      Subscription: {
        ...appSubscriptions
      },
      ...appRelations
    }
  };
}
