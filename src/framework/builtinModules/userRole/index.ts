import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export default {
  name: "UserRole",
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
      type UserRole {
        _id: String
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
        _id: String
        id: Int
        name: String
        user_id: Int
        role_id: Int
        created_by_id: Int
      }
    `,
    customResolvers: {
    },
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
    mongodb: {
      tableName: "userRole",
      schema: {
        name: String,
        user: { type: Schema.Types.ObjectId, ref: "user" },
        user_id: Number,
        role: { type: Schema.Types.ObjectId, ref: "role" },
        role_id: Number,
        created_by: { type: Schema.Types.ObjectId, ref: "user" },
        created_by_id: Number,
        created_at: String,
        updated_at: String,
      },
    },
  },
};
