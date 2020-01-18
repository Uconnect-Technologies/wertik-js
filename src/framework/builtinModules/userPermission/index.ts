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
        permission: Permission
        createdBy: User
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
        let view = await context.models["Permission"].findOneById(userPermission.permission, requestedFields);
        return view.instance;
      },
      user: async function(userPermission, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["User"].findOneById(userPermission.user, requestedFields);
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
      fields: {
        name: {
          type: "STRING"
        },
        user: {
          type: "INTEGER"
        },
        permission: {
          type: "INTEGER"
        },
        isDeleted: {
          type: "INTEGER"
        },
        createdBy: {
          type: "INTEGER"
        }
      },
      tableOptions: {
        indexes: [
          {
            unique: true,
            fields: ["user", "permission"]
            
          }
        ]
      }
    }
  }
};
