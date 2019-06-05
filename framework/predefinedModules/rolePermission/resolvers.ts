import validations from "./validations";
import dynamic from "./../../../framework/dynamic/index";
//@ts-ignore
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

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
    async permission(rolePermission: any) {
      return await relateResolver(permissionModel,rolePermission,'permission')
    },
    async role(rolePermission: any) {
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