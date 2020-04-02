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
        default_permissions: String
        created_by: User
        created_by_id: Int
        deleted: Boolean
        created_at: String
        updated_at: String
      }
      input RoleInput {
        id: Int
        default_permissions: String
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
      tableName: "role",
      fields: {
        name: {
          type: "STRING"
        },
        default_permissions: {
          type: "STRING"
        },
        is_deleted: {
          type: "INTEGER"
        },
        
        created_by_id: {
          type: "INTEGER"
        }
      }
    }
  }
};
