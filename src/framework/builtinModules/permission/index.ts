export default {
  name: "Permission",
  graphql: {
    crud: {
      query: {
        generate: true,
        operations: "*"
      },
      mutation: {
        generate: true,
        operations: "*"
      }
    },
    schema: `
          type Permission {
              id: Int
              name: String
              cant: String
              can: String
              createdBy: User
              created_at: String
              updated_at: String
          }
          input PermissionInput {
              id: Int
              name: String
              cant: String
              can: String
          }
      `,
    mutation: {
      schema: ``,
      resolvers: {}
    },
    query: {
      schema: ``,
      resolvers: {}
    }
  },
  restApi: {},
  database: {
    sql: {
      fields: {
        name: {
          type: "STRING"
        },
        cant: {
          type: "STRING"
        },
        can: {
          type: "STRING"
        },
        createdBy: {
          type: "INTEGER"
        }
      }
    }
  }
};
