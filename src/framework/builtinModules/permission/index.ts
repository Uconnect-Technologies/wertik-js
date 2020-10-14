const mongoose = require("mongoose");
const Schema = mongoose.Schema;
export default {
  name: "Permission",
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
      type Permission {
        _id: String
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
        _id: String
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
          graphqlName: "user_permissions",
          foreignKey: "permission_id",
        },
        RolePermission: {
          graphqlName: "role_permissions",
          foreignKey: "permission_id"
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
    mongodb: {
      tableName: "permission",
      schema: {
        name: {
          type: String,
          unique: true,
        },
        cant: {
          type: String,
        },
        can: {
          type: String,
        },
        created_by: { type: Schema.Types.ObjectId, ref: "user" },
        created_by_id: {
          type: Number,
        },
        created_at: {
          type: String,
        },
        updated_at: {
          type: String,
        },
      },
    },
  },
};
