let { ApolloServer } = require("apollo-server");
let { get } = require("lodash");
let loadAllModules = require("./loadAllModules").default;
import getUserWithAccessToken from "./../security/getUserWithAccessToken";
import getUserAllPermissions from "./../security/getUserAllPermissions";
import getUserRoles from "./../security/getUserRoles";
import { IGraphQLInitialize } from "./../types/servers";
import { get } from "lodash";
import isIPAllowed from "./../security/isIPAllowed";
import { successMessage } from "./../logger/consoleMessages";
import voyager from "./voyager/index";
import { defaultApolloGraphqlOptions } from "../defaults/options/index";

//expressApp,configuration,dbTables,models,emailTemplates,sendEmail,database,WertikEventEmitter

export default async function (options: IGraphQLInitialize) {
  const { mailerInstance, configuration, dbTables, models, sendEmail, emailTemplates, database, websockets, logger } = options;
  const apolloGraphqlOptions = get(options, "apolloGraphqlOptions", defaultApolloGraphqlOptions);
  const forceStartGraphqlServer = get(configuration, "forceStartGraphqlServer", true);
  let { graphql } = configuration;
  const port = get(graphql, "port", 4000);
  if (get(graphql, "disable", true) === true) {
    return null;
  }
  const modules = await loadAllModules(configuration);
  const graphqlVoyager = voyager(configuration, require("express"));
  let apollo = new ApolloServer({
    typeDefs: modules.schema,
    resolvers: modules.resolvers,
    context: async ({ req, res, connection }) => {
      let ip = get(req, "connection.remoteAddress", null);
      if (connection === null) {
        ip = get(connection, "remoteAddress", null);
        isIPAllowed(ip, configuration.security.allowedIpAddresses, "graphql", {});
      }
      const authToken = get(req, "headers.authorization", "");
      let user;
      if (authToken) {
        user = await getUserWithAccessToken(models.User, authToken);
      }
      let userPermissions = user ? await getUserAllPermissions(user.id, database) : [];
      let userRoles = user ? await getUserRoles(user.id, database) : [];
      let cxt = {
        database: database,
        user: user,
        dbTables,
        models,
        sendEmail: sendEmail,
        emailTemplates: emailTemplates,
        userPermissions: userPermissions,
        userRoles: userRoles,
        mailerInstance: mailerInstance,
        req,
        res,
        websockets,
        logger,
        ...get(configuration.context, "data", {}),
      };
      let createContext = await get(configuration.context, "createContext", () => {})("graphql", cxt);
      cxt["createContext"] = createContext;
      return cxt;
    },
    ...apolloGraphqlOptions,
  });

  return {
    graphql: apollo,
    graphqlVoyager: graphqlVoyager,
  };
}
