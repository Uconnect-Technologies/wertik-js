import { successMessage } from "./../logger/consoleMessages";
import { get } from "lodash";
import http from "http";
import { defaultPort } from "../helpers/index";
import { IConfiguration } from "../types/configuration";

export default function (configuration: IConfiguration, servers: any) {
  const expressAppPort = get(configuration, "port", defaultPort);
  const { graphql, restApi, graphqlVoyager } = servers;
  const graphqlPath = get(configuration, "graphql.path", "/graphql");
  const graphqlVoyagerPath = get(configuration, "graphql.graphqlVoyagerPath", "/graphql-voyager");
  const disableGraphqlVoyager = get(configuration, "graphql.disableGraphqlVoyager", false);
  const httpServer = http.createServer(restApi);
  if (disableGraphqlVoyager === false) {
    restApi.get(graphqlVoyagerPath, (req, res) => res.send(graphqlVoyager));
  }
  graphql.applyMiddleware({ app: restApi, path: graphqlPath });
  graphql.installSubscriptionHandlers(httpServer);
  restApi.get("*", function (req, res) {
    res.status(404).json({
      message: "Not found",
      detail: "Request page didn't found",
    });
  });
  httpServer.listen(expressAppPort, () => {
    successMessage(`Rest API server started at`, `http://localhost:${expressAppPort}`);
    if (disableGraphqlVoyager === false) {
      successMessage(`GraphQL Voyager running at`, `http://localhost:${expressAppPort}${graphqlVoyagerPath}`);
    }
    successMessage("GraphQL Server started at", `http://localhost:${expressAppPort}${graphql.graphqlPath}`);
    successMessage("GraphQL Subscriptions are running at", `ws://localhost:${expressAppPort}${graphql.subscriptionsPath}`);
  });
}
