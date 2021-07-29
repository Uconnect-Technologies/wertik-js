const { ApolloServer } = require("apollo-server-express");

export default function ({ app, store }) {
  const server = new ApolloServer({
    typeDefs: store.graphql.typeDefs,
    resolvers: {
      Query: store.graphql.resolvers.Query,
      Mutation: store.graphql.resolvers.Mutation,
    },
  });

  server.applyMiddleware({ app });
}
