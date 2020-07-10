const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export default {
  name: "Role",
  graphql: {
    crud: {
      query: {
        generate: true,
        operations: "*",
      },
      mutation: {
        generate: true,
        operations: "*",
      },
    },
    schema: `
      type Role {
        _id: String
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
        _id: String
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
    mongodb: {
      tableName: "role",
      schema: {
        name: String,
        default_permissions: String,
        created_by: { type: Schema.Types.ObjectId, ref: "user" },
        created_by_id: Number,
        is_deleted: Number,
        created_at: String,
        updated_at: String,
      },
    },
  },
};
