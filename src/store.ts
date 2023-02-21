import generalSchema from "./graphql/generalSchema"

const store: {
  graphql: {
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
