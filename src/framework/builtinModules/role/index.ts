export default {
  name: "Role",
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
      type Role {
        id: Int
        name: String
        defaultPermissions: String
        createdBy: User
        created_at: String
        updated_at: String
      }
      input RoleInput {
        id: Int
        defaultPermissions: String
        name: String
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
        defaultPermissions: {
          type: "STRING"
        },
        createdBy: {
          type: "INTEGER"
        }
      }
    }
  }
};
