import { GetMiddlewareOptions } from "apollo-server-express"
import { Store, WertikApp, WertikConfiguration } from "."

export interface GetMiddlewareOptionsGraphql extends GetMiddlewareOptions {
  path: string
}

export interface useGraphqlProps {
  options?: {
    [key: string]: any
  }
  applyMiddlewareOptions?: GetMiddlewareOptionsGraphql
  resolvers?: {
    Mutation: {}
    Query: {}
  }
  typeDefs?: string
}

export interface GraphqlInitializeProps {
  wertikApp: WertikApp
  store: Store
  configuration: WertikConfiguration
  expressApp: any
}
