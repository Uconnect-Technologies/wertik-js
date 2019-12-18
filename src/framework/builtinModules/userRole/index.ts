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
              role: Role
              createdBy: User
              created_at: String
              updated_at: String
          }
          input UserRoleInput {
              id: Int
              name: String
              user: Int
              role: Int
          }
      `,
    relations: {
      role: async function(userRole, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let view = await context.models["Role"].view(args, requestedFields);
        return view.instance;
      },
      user: async function(userRole, args, context, info) {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let view = await context.models["User"].view(args, requestedFields);
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
        role: {
          type: "INTEGER"
        },
        createdBy: {
          type: "INTEGER"
        }
      }
    }
  }
};
