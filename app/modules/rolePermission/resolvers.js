import validations from "./validations.js";
import dynamic from "./../../../framework/dynamic/index.js";
import allModels from "./../../../framework/dynamic/allModels.js";
import relateResolver from "./../../../framework/database/relateResolver.js";

let {rolePermissionModel,permissionModel,roleModel} = allModels;

let rolePermissionResolver = dynamic.resolvers({
  moduleName: 'RolePermission',
  validations: {
    create: validations.createRolePermission,
    delete: validations.deleteRolePermission,
    update: validations.updateRolePermission,
    view: validations.rolePermission
  },
  model: rolePermissionModel
});


export default {
  RolePermission: {
    async permission(rolePermission) {
      return await relateResolver(permissionModel,rolePermission,'permission')
    },
    async role(rolePermission) {
      return await relateResolver(roleModel,rolePermission,'role')
    }
  },
  queries: {
    ...dynamic.loader("RolePermission",rolePermissionResolver).queries
  },
  mutations: {
    ...dynamic.loader("RolePermission",rolePermissionResolver).mutations
  },
  
}