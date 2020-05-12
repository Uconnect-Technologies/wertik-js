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
    sql: {
      tableName: "permission",
      fields: {
        name: {
          type: "STRING",
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
        name: String,
        cant: String,
        can: String,
        created_by: { type: Schema.Types.ObjectId, ref: "user" },
        created_by_id: Number,
        created_at: String,
        updated_at: String,
      },
    },
  },
};
