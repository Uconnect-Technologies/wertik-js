import validations from "./validations";
import dynamic from "./../../../framework/dynamic/index";
//@ts-ignore
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let { rolePermissionModel, permissionModel, roleModel } = allModels;

let rolePermissionResolver = dynamic.resolvers({
  moduleName: "RolePermission",
  validations: {
    create: validations.createRolePermission,
    delete: validations.deleteRolePermission,
    update: validations.updateRolePermission,
    view: validations.rolePermission
  },
  model: rolePermissionModel
});

export default {
  Subscription: dynamic.loader("Role", rolePermissionResolver).subscriptions,
  RolePermission: {
    async permission(rolePermission: any) {
      return await relateResolver({
        relateWith: permissionModel,
        resolverName: "permission",
        currentInstance: rolePermission
      });
    },
    async role(rolePermission: any) {
      return await relateResolver({
        relateWith: roleModel,
        resolverName: "role",
        currentInstance: rolePermission
      });
    }
  },
  queries: dynamic.loader("RolePermission", rolePermissionResolver).queries,
  mutations: dynamic.loader("RolePermission", rolePermissionResolver).mutations
};
