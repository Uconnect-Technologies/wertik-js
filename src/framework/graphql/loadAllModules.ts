/*
    This is all where GraphQL thing happens. This file loads all graphql schemas from the app.
*/
import {get, isFunction} from "lodash"
import generalSchema from "./generalSchema";
import {
  generateSubscriptionsCrudResolvers,
  generateQueriesCrudSchema,
  generateListTypeForModule,
  generateMutationsCrudSubscriptionSchema,
  generateMutationsCrudSchema,
  generateCrudResolvers,
} from "./crudGenerator";
import { PubSub } from "apollo-server"
import { IConfiguration } from "../types/configuration";
import { GraphQLModuleRelationMapper } from "../moduleRelationships/graphql";
const pubsub = new PubSub();

export default async function (configuration: IConfiguration) {
  let modulesSchema = ``;

  let modulesQuerySchema = ``;
  let modulesMutationSchema = ``;
  let modulesSubscriptionSchema = ``;
  let modules = process.env.builtinModules.split(",");
  modules = modules.filter((c) => c);
  modules = [...modules, ...get(configuration, "modules", [])];
  let response = () => {
    return {
      message: require("../../../package.json").welcomeResponse,
      version: require("../../../package.json").version,
    };
  };
  let schemaMap = require("./schemaMap").default;

  let appMutations = {};
  let appQueries = {};
  let appSubscriptions = {};
  let appCustomResolvers = {};

  const processModule = function (module) {
    if (module && module.hasOwnProperty("graphql")) {
      // fixme: re create the functino again. The current one sucks!
      process.exit()
      let graphql = module.graphql;
      const useDatabase = get(module, "useDatabase", true);
      let moduleName = module.name;
      let schema = graphql.schema;
      let currentMutationSchema = get(graphql, "mutation.schema", "");
      let currentMutationResolvers = get(graphql, "mutation.resolvers", {});
      let currentQuerySchema = get(graphql, "query.schema", "");
      let currentQueryResolvers = get(graphql, "query.resolvers", {});
      let currentModuleCrudResolvers: any =  useDatabase ?  generateCrudResolvers(
        module,
        pubsub,
        configuration
      ) : {}
      let currentModuleSubscriptionResolvers = {};
      let currentModuleListSchema = useDatabase ? generateListTypeForModule(module) : "";
      if (useDatabase === true) {
        currentModuleSubscriptionResolvers = generateSubscriptionsCrudResolvers(moduleName, pubsub);
      }
      // relations
      let customResolvers = get(graphql, "customResolvers", {});
      
      appCustomResolvers[module.name] = {
        ...customResolvers,
        ...GraphQLModuleRelationMapper(module),
      };

      // Issue: https://github.com/Uconnect-Technologies/wertik-js/issues/215
      const totalResolvers = Object.keys(appCustomResolvers[module.name]).length
      if (totalResolvers === 0) {
        delete appCustomResolvers[module.name]
      }
      // relations
      // require information
      // crud
      modulesQuerySchema = modulesQuerySchema + (useDatabase) ? generateQueriesCrudSchema(moduleName) : "";
      appQueries = { ...appQueries, ...currentModuleCrudResolvers.queries };

      modulesMutationSchema = modulesMutationSchema + (useDatabase) ? generateMutationsCrudSchema(moduleName) : "";
      appMutations = { ...appMutations, ...currentModuleCrudResolvers.mutations };

      // crud
      // Subscription

      let currentModuleCrudSubscription = (useDatabase) ? generateMutationsCrudSubscriptionSchema(moduleName) : ""

      // Subscription
      modulesSchema = modulesSchema + schema;
      modulesSchema = modulesSchema + currentModuleListSchema;
      modulesQuerySchema = modulesQuerySchema + currentQuerySchema;
      modulesMutationSchema = modulesMutationSchema + currentMutationSchema;
      modulesSubscriptionSchema = modulesSubscriptionSchema + currentModuleCrudSubscription;
      appQueries = { ...appQueries, ...currentQueryResolvers };
      appMutations = { ...appMutations, ...currentMutationResolvers };
      appSubscriptions = { ...appSubscriptions, ...currentModuleSubscriptionResolvers };
    }
  };

  

  modules.forEach(async (element: any) => {
    let module;
    if (element.constructor === String) {
      module = require(`./../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object || isFunction(element)) {
      if (element.constructor == Function) {
        module = await element(configuration);
      } else {
        module = element;
      }
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
        response: response,
      },
      Query: {
        ...appQueries,
        response: response,
      },
      Subscription: {
        ...appSubscriptions,
      },
      ...appCustomResolvers,
    },
  };
}
