/*
    This is all where GraphQL thing happens. This file loads all graphql schemas from the app.
*/
import { get, isFunction } from "lodash";
import generalSchema from "./generalSchema";
import {
  generateSubscriptionsCrudResolvers,
  generateQueriesCrudSchema,
  generateListTypeForModule,
  generateMutationsCrudSubscriptionSchema,
  generateMutationsCrudSchema,
  generateCrudResolvers,
} from "./crudGenerator";
import { PubSub } from "apollo-server";
import { IConfiguration } from "../types/configuration";
import { GraphQLModuleRelationMapper } from "../moduleRelationships/graphql";
import self from "./self";
const pubsub = new PubSub();

export default async function (configuration: IConfiguration) {
  let modulesSchema = `
    ${self.schema}
  `;

  let modulesQuerySchema = `
  ${self.queries.schema}
  `;
  let modulesMutationSchema = `
    ${self.mutations.schema}
  `;
  let modulesSubscriptionSchema = ``;
  let modules = process.env.builtinModules.split(",");
  modules = modules.filter((c) => c);
  modules = [...modules, ...get(configuration, "modules", [])];
  let response = () => {
    return {
      message: "Welcome to wertik, You are successfully running Wertik.",
      version: require("../../../package.json").version,
    };
  };
  let schemaMap = require("./schemaMap").default;

  let appMutations = {
    ...self.mutations.resolvers,
  };
  let appQueries = {
    ...self.queries.resolvers,
  };
  let appSubscriptions = {};
  let appCustomResolvers = {};

  const processModule = function (currentModule) {
    if (currentModule && currentModule.hasOwnProperty("graphql")) {
      // Process Module Graphql
      const moduleGraphql = currentModule.graphql;
      const useDatabase = get(currentModule, "useDatabase", true);
      const currentModuleName = currentModule.name;

      const currentModuleGraphqlSchema = get(moduleGraphql, "schema", "");

      const currentModuleGraphqlQuerySchema = get(
        moduleGraphql,
        "query.schema",
        ""
      );
      const currentModuleGraphqlQueryResolvers = get(
        moduleGraphql,
        "query.resolvers",
        {}
      );

      const currentModuleGraphqlMutationSchema = get(
        moduleGraphql,
        "mutation.schema",
        ""
      );
      const currentModuleGraphqlMutationResolvers = get(
        moduleGraphql,
        "mutation.resolvers",
        {}
      );

      const customResolvers = get(moduleGraphql, "customResolvers", {});

      modulesSchema = `${modulesSchema}
        ${currentModuleGraphqlSchema}`;

      modulesQuerySchema = `${modulesQuerySchema}
        ${currentModuleGraphqlQuerySchema}`;

      appQueries = {
        ...appQueries,
        ...currentModuleGraphqlQueryResolvers,
      };

      modulesMutationSchema = `${modulesMutationSchema}
        ${currentModuleGraphqlMutationSchema}`;

      appMutations = {
        ...appMutations,
        ...currentModuleGraphqlMutationResolvers,
      };

      appCustomResolvers[currentModuleName] = {
        ...customResolvers,
        ...GraphQLModuleRelationMapper(currentModule),
      };

      // Process Module Graphql

      // Process Crud for Module:

      if (useDatabase === true) {
        let currentModuleListSchema = generateListTypeForModule(currentModule);

        modulesSchema = `${modulesSchema}
        ${currentModuleListSchema}`;

        const crudResolvers = generateCrudResolvers(
          currentModule,
          pubsub,
          configuration
        );

        const crudMutationSchema = generateMutationsCrudSchema(
          currentModuleName
        );
        const crudMutationResolvers = crudResolvers.mutations;

        const crudQuerySchema = generateQueriesCrudSchema(currentModuleName);
        const crudQueryResolvers = crudResolvers.queries;

        const crudSubscriptionSchema = generateMutationsCrudSubscriptionSchema(
          currentModuleName
        );
        const crudSubscriptionResolvers = generateSubscriptionsCrudResolvers(
          currentModuleName,
          pubsub
        );

        modulesQuerySchema = `${modulesQuerySchema}
        ${crudQuerySchema}
        `;

        appQueries = {
          ...appQueries,
          ...crudQueryResolvers,
        };

        modulesMutationSchema = `${modulesMutationSchema}
        ${crudMutationSchema}`;

        appMutations = {
          ...appMutations,
          ...crudMutationResolvers,
        };

        modulesSubscriptionSchema =
          modulesSubscriptionSchema + crudSubscriptionSchema;

        appSubscriptions = {
          ...appSubscriptions,
          ...crudSubscriptionResolvers,
        };
      }

      // Check for empty resolvers and remove them

      const totalResolvers = Object.keys(
        get(appCustomResolvers, currentModuleName, {})
      ).length;
      // cosnoel
      if (totalResolvers === 0) {
        delete appCustomResolvers[currentModuleName];
      }

      // Process Crud for module:
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
  schemaMap = schemaMap.replace(
    "[subscription__replace]",
    modulesSubscriptionSchema
  );

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
