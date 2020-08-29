import { successMessage } from "./../logger/consoleMessages";
import { get } from "lodash";
export default function (configuration, servers: any) {
  const expressAppPort = get(configuration, "restApi.port", 7000);
  const graphqlAppPort = get(configuration, "graphql.port", 4000);
  const { graphql, restApi, graphqlVoyager } = servers;

  restApi.get("/graphql-voyager", (req, res) => res.send(graphqlVoyager));
  graphql.applyMiddleware({ app: restApi });
  restApi.get("*", function (req, res) {
    res.status(404).json({
      message: "Not found",
      detail: "Request page didn't found",
    });
  });
  restApi.listen(expressAppPort, () => {
    successMessage(`Rest API server started at`, `http://localhost:${expressAppPort}`);
    successMessage(`GraphQL Voyager running at`, `http://localhost:${expressAppPort}/graphql-voyager`);
    successMessage("GraphQL Server started at", `http://localhost:${expressAppPort}${graphql.graphqlPath}`);
  });
}
