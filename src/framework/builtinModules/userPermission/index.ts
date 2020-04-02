import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";

export default {
  name: "UserPermission",
  graphql: {
    crud: {
      query: {
        generate: true,
        operations: "*"
      },
      mutation: {
        generate: true,
        operations: "*"
      }
    },
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
        user: Int
        permission: Int
      }
      `,
    relations: {
      permission: async function(userPermission, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["Permission"].findOneById(userPermission.permission_id, requestedFields);
        return view.instance;
      },
      user: async function(userPermission, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["User"].findOneById(userPermission.user_id, requestedFields);
        return view.instance;
      }
    },
    mutation: {
      schema: ``,
      resolvers: {}
    },
    query: {
      schema: ``,
      resolvers: {}
    }
  },
  restApi: {},
  database: {
    sql: {
      tableName: "userPermission",
      fields: {
        name: {
          type: "STRING"
        },
        user_id: {
          type: "INTEGER"
        },
        permission_id: {
          type: "INTEGER"
        },
        is_deleted: {
          type: "INTEGER"
        },
        created_by_id: {
          type: "INTEGER"
        }
      },
    }
  }
};
