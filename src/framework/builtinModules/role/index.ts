export default {
  name: "Role",
  graphql: {
    schema: `
      type Role {
        id: Int
        name: String
        default_permissions: String
        created_by: User
        created_by_id: Int
        is_deleted: Boolean
        created_at: String
        updated_at: String
        user_roles: UserRoleList
        role_permissions: RolePermissionList
      }
      input RoleInput {
        id: Int
        default_permissions: String
        created_by_id: Int
        name: String
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
    selectIgnoreFields: ["user_roles", "role_permissions", "created_by"],
    relationships: {
      oneToMany: {
        UserRole: {
          graphqlName: "user_roles",
          foreignKey: "role_id",
        },
        RolePermission: {
          graphqlName: "role_permissions",
          foreignKey: "role_id",
        },
      },
      oneToOne: {
        User: {
          graphqlName: "created_by",
          foreignKey: "id",
          relationColumn: "created_by_id",
        },
      },
    },
    sql: {
      tableName: "role",
      fields: {
        name: {
          type: "STRING",
          unique: true,
        },
        default_permissions: {
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
