import { successMessage } from "./../logger/consoleMessages";
import { get } from "lodash";
import { defaultPort } from "../helpers/index";
import { IConfiguration } from "../types/configuration";

export default function (configuration: IConfiguration, servers: any) {
  const startServers = get(configuration, "startServers", true);
  if (startServers === true) {
    const expressAppPort = get(configuration, "port", defaultPort);
    const showWertik404Page = get(configuration, "restApi.showWertik404Page", true);
    const { graphql, restApi, graphqlVoyager, httpServer } = servers;
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
    
    if (disableGraphqlVoyager === false) {
      restApi.get(graphqlVoyagerPath, (req, res) => res.send(graphqlVoyager));
    }
    if (disableGraphql === false) {
      graphql.applyMiddleware({ app: restApi, path: graphqlPath });
      graphql.installSubscriptionHandlers(httpServer);
    }
    if (showWertik404Page) {
      restApi.get("*", function (req, res) {
        res.status(404).json({
          message: "Not found",
          data: {
            message: "Request page didn't found"
          },
        });
      });
    }
    httpServer.listen(expressAppPort, () => {
      successMessage(
        `Rest API server started at`,
        `http://localhost:${expressAppPort}`
      );
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
        successMessage(
          "GraphQL Subscriptions are running at",
          `ws://localhost:${expressAppPort}${graphql.subscriptionsPath}`
        );
      }
    });
  }
}
