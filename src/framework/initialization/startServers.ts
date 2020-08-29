import { successMessage } from "./../logger/consoleMessages";
import { get } from "lodash";
export default function (configuration, servers: any) {
  const expressAppPort = get(configuration, "restApi.port", 7000);
  const graphqlAppPort = get(configuration, "graphql.port", 4000);
  const { graphql, restApi, graphqlVoyager } = servers;
  const forceStartGraphqlServer = get(configuration, "forceStartGraphqlServer", true);

  if (configuration.forceStartRestApiServer === true) {
    restApi.get("/graphql-voyager", (req, res) => res.send(graphqlVoyager));
    restApi.get("*", function (req, res) {
      res.status(404).json({
        message: "Not found",
        detail: "Request page didn't found",
      });
    });
    restApi.listen(expressAppPort, () => {
      successMessage(`Rest API server started at`, `http://localhost:${expressAppPort}`);
      successMessage(`GraphQL Voyager running at`, `http://localhost:${expressAppPort}/graphql-voyager`);
    });
  }
  if (forceStartGraphqlServer == true) {
    graphql.listen(graphqlAppPort).then(({ url, subscriptionsUrl }) => {
      successMessage("GraphQL Subscriptions server started at ", subscriptionsUrl);
      successMessage("GraphQL Server started at", url);
    });
  }
}
