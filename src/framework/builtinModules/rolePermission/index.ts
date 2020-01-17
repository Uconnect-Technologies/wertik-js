import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";

export default {
  name: "RolePermission",
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
      type RolePermission {
        id: Int
        name: String
        role: Role
        permission: Permission
        createdBy: User
        created_at: String
        updated_at: String
      }
      input RolePermissionInput {
        id: Int
        name: String
        role: Int
        permission: Int
      }
    `,
    relations: {
      permission: async function(rolePermission, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["Permission"].findOneById(rolePermission.permission, requestedFields);
        return view.instance;
      },
      role: async function(rolePermission, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["Role"].findOneById(rolePermission.role, requestedFields);
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
        role: {
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
      }
    }
  }
};
