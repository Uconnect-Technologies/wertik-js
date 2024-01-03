import get from "lodash.get"
import omit from "lodash.omit"
import { defaultApolloGraphqlOptions } from "../utils/defaultOptions"
import { ApolloServer } from "apollo-server-express"
import { UseGraphqlProps, GraphqlInitializeProps } from "../types/graphql"
import { wLogWithSuccess } from "../utils/log"
import fs from "fs"
import path from "path"

export const useGraphql = (props?: UseGraphqlProps) => {
  return ({
    wertikApp,
    expressApp,
    store,
    configuration,
  }: GraphqlInitializeProps) => {
    props = props ? props : {}
    store.graphql.typeDefs = store.graphql.typeDefs.concat(
      get(configuration, "graphql.typeDefs", "")
    )

    store.graphql.resolvers.Query = {
      ...store.graphql.resolvers.Query,
      ...get(configuration, "graphql.resolvers.Query", {}),
    }

    store.graphql.resolvers.Mutation = {
      ...store.graphql.resolvers.Mutation,
      ...get(configuration, "graphql.resolvers.Mutation", {}),
    }

    const options = { ...get(configuration, "graphql.options", {}) }

    if (props && props.storeTypeDefFilePath) {
      if (fs.existsSync(props.storeTypeDefFilePath))
        fs.unlinkSync(props.storeTypeDefFilePath)
      fs.writeFileSync(props.storeTypeDefFilePath, store.graphql.typeDefs)
    }

    const GraphqlApolloServer = new ApolloServer({
      typeDefs: store.graphql.typeDefs,
      resolvers: {
        ...store.graphql.resolvers,
      },
      ...defaultApolloGraphqlOptions,
      ...omit(options, ["context"]),
      context: async (options) => {
        let contextFromOptions = await get(options, "context", function () {})()

        return {
          wertik: wertikApp,
          req: options.req,
          res: options.res,
          ...contextFromOptions,
        }
      },
    })

    GraphqlApolloServer.applyMiddleware({
      app: expressApp,
      ...(props?.applyMiddlewareOptions ?? {}),
    })

    wLogWithSuccess(
      "[Wertik-Graphql]",
      `http://localhost:${configuration.port ?? 1200}/${
        props?.applyMiddlewareOptions?.path ?? "graphql"
      }`
    )

    return GraphqlApolloServer
  }
}
