import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema";
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey";

let object = {
  schema: {
    permission: {
      schema: `
        type Permission {
          ${primaryKey}: ${primaryKeyType}
          name: String
          can: String
          cant: String
          created_by: User
        }
        ${getListByPaginationAndFiltersSchema("Permission")}
        input PermissionInput {
          ${primaryKey}: ${primaryKeyType}
          name: String
          can: String
          cant: String
        }
      `,
      resolvers: {}
    },
    query: {
      schema: {},
      resolvers: {}
    },
    mutation: {
      schema: {},
      resolvers: {}
    },
    subscriptions: {
      schema: ``,
      resolvers: {}
    }
  },
  fields: {}
};

export default object;
