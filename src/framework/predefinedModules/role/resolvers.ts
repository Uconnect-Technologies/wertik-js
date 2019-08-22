import dynamic from "./../../../framework/dynamic/index";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let { roleModel, rolePermissionModel } = allModels;

let roleResolver = dynamic.resolvers({
  moduleName: "Role",
  model: roleModel
});

export default {
  Subscription: dynamic.loader("Role", roleResolver).subscriptions,
  Role: {
    async permissions(role: any) {
      return await relateResolver({
        relateWith: rolePermissionModel,
        model: role,
        relationName: "role",
        type: "multiple"
      });
    }
  },
  mutations: dynamic.loader("Role", roleResolver).mutations,
  queries: dynamic.loader("Role", roleResolver).queries
};
