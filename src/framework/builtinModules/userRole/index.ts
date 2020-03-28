import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";

export default {
  name: "UserRole",
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
      type UserRole {
        id: Int
        name: String
        user: User
        user_id: Int
        role: Role
        role_id: Int
        createdBy: User
        created_at: String
        updated_at: String
      }
      input UserRoleInput {
        id: Int
        name: String
        user_id: Int
        role_id: Int
      }
    `,
    relations: {
      role: async function(userRole, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["Role"].findOneById(userRole.role, requestedFields);
        return view.instance;
      },
      user: async function(userRole, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, true);
        let view = await context.models["User"].findOneById(userRole.user, requestedFields);
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
      tableName: "userRole",
      fields: {
        name: {
          type: "STRING"
        },
        user_id: {
          type: "INTEGER"
        },
        role_id: {
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
