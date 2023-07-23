import generalSchema from "./graphql/generalSchema"
import { WertikApp } from "./types"

export const wertikApp: WertikApp = {
  restartServer: () => {},
  stopServer: () => {},
  startServer: () => {},
  appEnv: "local",
  port: 1200,
  modules: {},
  models: {},
  database: {},
  mailer: {},
  graphql: {},
  sockets: {},
  cronJobs: {},
  storage: {},
  queue: {
    jobs: {},
    bullBoard: {},
  },
  redis: {},
  logger: null,
}

const store: {
  graphql: {
    graphqlKeys: string[]
    typeDefs: string
    resolvers: {
      Query: {
        [key: string]: Function
      }
      Mutation: {
        [key: string]: Function
      }
      [key: string]: {
        [key: string]: Function
      }
    }
  }
  database: {
    relationships: any[]
    models: {
      [key: string]: any
    }
  }
} = {
  graphql: {
    graphqlKeys: [],
    typeDefs: `
        ${generalSchema}
        type Response {
          message: String
          version: String
        }
        type Query {
          version: String
        }
        type Mutation {
          version: String
        }
        schema {
          query: Query
          mutation: Mutation
        }
    `,
    resolvers: {
      Query: {
        version: () => require("../../package.json").version,
      },
      Mutation: {
        version: () => require("../../package.json").version,
      },
    },
  },
  database: {
    relationships: [],
    models: {},
  },
}

export default store
