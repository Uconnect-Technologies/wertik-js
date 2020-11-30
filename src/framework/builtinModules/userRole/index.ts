export default {
  name: "UserRole",
  graphql: {
    schema: `
      type UserRole {
        id: Int
        name: String
        user: User
        user_id: Int
        role: Role
        role_id: Int
        created_by: User
        created_by_id: Int
        created_at: String
        updated_at: String
      }
      input UserRoleInput {
        id: Int
        name: String
        user_id: Int
        role_id: Int
        created_by_id: Int
      }
    `,
    customResolvers: {},
    mutation: {
      schema: ``,
      resolvers: {},
    },
    query: {
      schema: ``,
      resolvers: {},
    },
  },

  restApi: {},
  database: {
    selectIgnoreFields: ["user", "role", "created_by"],
    relationships: {
      oneToOne: {
        User: [
          {
            relationColumn: "user_id",
            graphqlName: "user",
            foreignKey: "id",
          },
          {
            relationColumn: "created_by_id",
            graphqlName: "created_by",
            foreignKey: "id",
          },
        ],
        Role: {
          relationColumn: "role_id",
          graphqlName: "role",
          foreignKey: "id",
        },
      },
    },
    sql: {
      tableName: "userRole",
      fields: {
        name: {
          type: "STRING",
        },
        user_id: {
          type: "INTEGER",
        },
        role_id: {
          type: "INTEGER",
        },
        is_deleted: {
          type: "INTEGER",
        },
        created_by_id: {
          type: "INTEGER",
        },
      },
    },
  },
};
