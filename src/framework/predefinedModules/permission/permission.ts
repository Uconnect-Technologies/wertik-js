import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey";
import generateListType from "./../../../framework/generators/generateListType";
import generateQuerySchema from "./../../../framework/generators/generateQuerySchema";
import generateMutationSchema from "./../../../framework/generators/generateMutationSchema";
import generateResolvers from "./../../../framework/generators/generateResolvers";
import generateSubscriptionSchema from "./../../../framework/generators/generateSubscriptionSchema";

let PermissionResolver = generateResolvers({
  moduleName: "Permission",
  modelName: "permissionModel"
});

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
        ${generateListType("Permission")}
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
      schema: `
        ${generateQuerySchema("Permission")}
      `,
      resolvers: {
        ...PermissionResolver.Query
      }
    },
    mutation: {
      schema: `
        ${generateMutationSchema("Permission")}
      `,
      resolvers: {
        ...PermissionResolver.Mutation
      }
    },
    subscription: {
      schema: `
        ${generateSubscriptionSchema("Permission")}
      `,
      resolvers: {
        ...PermissionResolver.Mutation
      }
    }
  },
  fields: {
    name: String,
    can: String,
    cant: String
  }
};

export default object;
