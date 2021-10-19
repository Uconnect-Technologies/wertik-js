import { get } from "lodash";
import { defaultApolloGraphqlOptions } from "../../framework/defaults/options";
const { ApolloServer } = require("apollo-server-express");

export const useGraphql = (obj) => obj;

export default function ({ app, store, configuration }) {
  const options = { ...get(configuration, "graphql.options", {}) };

  const GraphqlApolloServer = new ApolloServer({
    typeDefs: store.graphql.typeDefs,
    resolvers: {
      ...store.graphql.resolvers,
    },
    ...defaultApolloGraphqlOptions,
    ...options,
    context: async () => {
      let contextFromOptions = await get(options, "context", function () {})();
      return {
        wertik: configuration,
        ...contextFromOptions,
      };
    },
  });

  GraphqlApolloServer.applyMiddleware({ app });

  return GraphqlApolloServer;
}
