export default {
  name: "UserPermission",
  graphql: {
    schema: `
      type UserPermission {
        id: Int
        name: String
        user: User
        user_id: Int
        permission: Permission
        permission_id: Int
        created_by: User
        created_by_id: Int
        created_at: String
        updated_at: String
      }
      input UserPermissionInput {
        id: Int
        name: String
        user_id: Int
        permission_id: Int
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
    selectIgnoreFields: ["user", "permission", "created_by"],
    relationships: {
      belongsTo: {
        Permission: {
          relationColumn: "permission_id",
          graphqlName: "permission",
          foreignKey: "id"
        },
      },
      oneToOne: {
        User: [
          {
            relationColumn: "created_by_id",
            graphqlName: "created_by",
            foreignKey: "id",
          },
          {
            relationColumn: "user_id",
            graphqlName: "user",
            foreignKey: "id",
          },
        ],
        
      },
    },
    sql: {
      tableName: "userPermission",
      fields: {
        name: {
          type: "STRING",
        },
        user_id: {
          type: "INTEGER",
        },
        permission_id: {
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
