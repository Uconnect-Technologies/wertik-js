import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export default {
  name: "RolePermission",
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
      type RolePermission {
        _id: String
        id: Int
        name: String
        role: Role
        role_id: Int
        permission: Permission
        permission_id: Int
        created_by: User
        created_by_id: Int
        created_at: String
        updated_at: String
      }
      input RolePermissionInput {
        _id: String
        id: Int
        name: String
        role_id: Int
        permission_id: Int
        created_by_id: Int
      }
    `,
    relations: {
      permission: async function (rolePermission, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["Permission"].findOneById(rolePermission.permission_id, requestedFields);
        return view.instance;
      },
      role: async function (rolePermission, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["Role"].findOneById(rolePermission.role_id, requestedFields);
        return view.instance;
      },
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
      tableName: "rolePermission",
      fields: {
        name: {
          type: "STRING",
        },
        role_id: {
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
      tableName: "rolePermission",
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
  },
};
