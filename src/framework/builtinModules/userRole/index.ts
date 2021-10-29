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
      belongsTo: {
        Role: {
          sourceKey: "role_id",
          as: "role",
          foreignKey: "id",
        },
      },
      oneToOne: {
        User: [
          {
            sourceKey: "user_id",
            as: "user",
            foreignKey: "id",
          },
          {
            sourceKey: "created_by_id",
            as: "created_by",
            foreignKey: "id",
          },
        ],
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
