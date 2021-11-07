import { successMessage } from "./../logger/consoleMessages";
import { get } from "lodash";
import { IConfiguration } from "../types/configuration";
import { isFunction } from "lodash";
import { defaultPort } from "../defaults/options";

export default function (configuration: IConfiguration, servers: any) {
  const startServers = get(configuration, "startServers", null);

  if (isFunction(startServers)) {
    startServers(configuration, servers);
  } else {
    const { graphql, restApi, graphqlVoyager, httpServer } = servers;

    const expressAppPort = get(configuration, "port", defaultPort);
    const showWertik404Page = get(
      configuration,
      "restApi.showWertik404Page",
      true
    );
    const restApi404Handler = get(
      configuration,
      "restApi.restApi404Handler",
      function (req, res) {
        res.status(404).json({
          message: "Not found",
          data: {
            message: "Request page didn't found",
          },
        });
      }
    );
    const restApiBeforeStart = get(
      configuration,
      "restApi.beforeStart",
      function () {}
    );

    const graphqlPath = get(configuration, "graphql.path", "/graphql");
    const graphqlVoyagerPath = get(
      configuration,
      "graphql.graphqlVoyagerPath",
      "/graphql-voyager"
    );
    const disableGraphqlVoyager = get(
      configuration,
      "graphql.disableGraphqlVoyager",
      false
    );

    const disableGraphql = get(configuration, "graphql.disable", false);
    const disableSockets = get(configuration, "sockets.disable", false);

    if (disableGraphqlVoyager === false) {
      restApi.get(graphqlVoyagerPath, (req, res) => res.send(graphqlVoyager));
    }
    if (disableGraphql === false) {
      graphql.applyMiddleware({ app: restApi, path: graphqlPath });
      graphql.installSubscriptionHandlers(httpServer);
    }

    restApiBeforeStart({ express: restApi });

    if (showWertik404Page) {
      restApi.get("*", restApi404Handler);
    }
    httpServer.listen(expressAppPort, () => {
      successMessage(
        `Express Server Started`,
        `http://localhost:${expressAppPort}`
      );
      if (disableSockets === false) {
        successMessage(
          `Socket.IO server running at`,
          `http://localhost:${expressAppPort}`
        );
      }
      if (disableGraphqlVoyager === false) {
        successMessage(
          `GraphQL Voyager running at`,
          `http://localhost:${expressAppPort}${graphqlVoyagerPath}`
        );
      }
      if (disableGraphql === false) {
        successMessage(
          "GraphQL Server started at",
          `http://localhost:${expressAppPort}${graphql.graphqlPath}`
        );
      }
    });
  }
}
