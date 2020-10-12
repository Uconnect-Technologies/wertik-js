// let { ApolloServer } = require("apollo-server");
let { get } = require("lodash");
let loadAllModules = require("./loadAllModules").default;
import getUserWithAccessToken from "./../security/getUserWithAccessToken";
import getUserAllPermissions from "./../security/getUserAllPermissions";
import getUserRoles from "./../security/getUserRoles";
import { IGraphQLInitialize } from "./../types/servers";
import { get } from "lodash";
import voyager from "./voyager/index";
import { defaultApolloGraphqlOptions } from "../defaults/options/index";
const { ApolloServer } = require("apollo-server-express");

//expressApp,configuration,dbTables,models,emailTemplates,sendEmail,database,WertikEventEmitter

export default async function (options: IGraphQLInitialize) {
  const { mailerInstance, configuration, dbTables, models, sendEmail, emailTemplates, database, socketio, logger } = options;
  const apolloGraphqlOptions = get(options, "apolloGraphqlOptions", defaultApolloGraphqlOptions);
  let initializeContext = get(configuration, "context.initializeContext", async function () {});
  initializeContext = await initializeContext("graphql",{
    dbTables,
    models,
    database,
  });
  const modules = await loadAllModules(configuration);
  const graphqlVoyager = voyager(configuration);
  const apollo = new ApolloServer({
    typeDefs: modules.schema,
    resolvers: modules.resolvers,
    context: async ({ req, res, connection }) => {
      let ip = get(req, "connection.remoteAddress", null);
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
        socketio,
        logger,
        initializeContext: initializeContext
      };
      let requestContext = await get(configuration.context, "requestContext", () => {})("graphql", cxt);
      cxt["requestContext"] = requestContext;
      return cxt;
    },
    ...apolloGraphqlOptions,
  });

  return {
    graphql: apollo,
    graphqlVoyager: graphqlVoyager,
  };
}
