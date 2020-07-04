import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export default {
  name: "UserPermission",
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
      type UserPermission {
        _id: String
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
        _id: String
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
    mongodb: {
      tableName: "userPermission",
      schema: {
        name: String,
        role: { type: Schema.Types.ObjectId, ref: "role" },
        role_id: Number,
        permission: { type: Schema.Types.ObjectId, ref: "permission" },
        permission_id: Number,
        created_by: { type: Schema.Types.ObjectId, ref: "user" },
        created_by_id: Number,
        created_at: String,
        updated_at: String,
      },
    },
    // relationships: {
    //   User: {
        
    //   },
    // },
  },
};
