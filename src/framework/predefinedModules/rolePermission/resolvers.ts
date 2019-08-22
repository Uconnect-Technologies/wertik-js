import dynamic from "./../../../framework/dynamic/index";
//@ts-ignore
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let { rolePermissionModel, permissionModel, roleModel } = allModels;

let rolePermissionResolver = dynamic.resolvers({
  moduleName: "RolePermission",
  model: rolePermissionModel
});

export default {
  Subscription: dynamic.loader("Role", rolePermissionResolver).subscriptions,
  RolePermission: {
    async permission(rolePermission: any) {
      return await relateResolver({
        relateWith: permissionModel,
        model: rolePermission,
        relationName: "permission",
        type: "single"
      });
    },
    async role(rolePermission: any) {
      return await relateResolver({
        relateWith: roleModel,
        model: rolePermission,
        relationName: "role",
        type: "single"
      });
    }
  },
  queries: dynamic.loader("RolePermission", rolePermissionResolver).queries,
  mutations: dynamic.loader("RolePermission", rolePermissionResolver).mutations
};
