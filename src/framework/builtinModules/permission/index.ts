export default {
  name: "Permission",
  graphql: {
    schema: `
      type Permission {
        id: Int
        name: String
        cant: String
        can: String
        created_by: User
        created_by_id: Int
        created_at: String
        updated_at: String
        user_permissions: UserPermissionList 
        role_permissions: RolePermissionList 
      }
      input PermissionInput {
        id: Int
        name: String
        cant: String
        can: String
        created_by_id: Int
      }
      
      `,
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
    selectIgnoreFields: ["user_permissions", "role_permissions", "created_by"],
    relationships: {
      oneToMany: {
        UserPermission: {
          as: "user_permissions",
          foreignKey: "permission_id",
        },
        RolePermission: {
          as: "role_permissions",
          foreignKey: "permission_id"
        },
      },
      oneToOne: {
        User: {
          as: "created_by",
          foreignKey: "id",
          sourceKey: "created_by_id",
        },
      },
    },
    sql: {
      tableName: "permission",
      fields: {
        name: {
          type: "STRING",
          unique: true,
        },
        cant: {
          type: "STRING",
        },
        can: {
          type: "STRING",
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
