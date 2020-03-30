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
        role_id: Int
        permission: Permission
        permission_id: Int
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
      tableName: "rolePermission",
      fields: {
        name: {
          type: "STRING"
        },
        role_id: {
          type: "INTEGER"
        },
        
        permission_id: {
          type: "INTEGER"
        },
        is_deleted: {
          type: "INTEGER"
        },
        created_by: {
          type: "INTEGER"
        }
      }
    }
  }
};
