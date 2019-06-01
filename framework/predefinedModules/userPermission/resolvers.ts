import validations from "./validations.ts";
import dynamic from "./../../../framework/dynamic/index.ts";
import allModels from "./../../../framework/dynamic/allModels.ts";
import relateResolver from "./../../../framework/database/relateResolver.ts";

let {userPermissionModel,userModel,permissionModel} = allModels;

let userPermissionResolver = dynamic.resolvers({
  moduleName: 'UserPermission',
  validations: {
    create: validations.createUserPermission,
    delete: validations.deleteUserPermission,
    update: validations.updateUserPermission,
    view: validations.userPermission
  },
  model: userPermissionModel
});

export default {
  UserPermission: {
    async user(userPermission) {
      return await relateResolver(userModel,userPermission,'user')
    },
    async permission(userPermission) {
      return await relateResolver(permissionModel,userPermission,'permission')
    }
  },
  queries: {
    ...dynamic.loader("UserPermission",userPermissionResolver).queries
  },
  
  mutations: {
    ...dynamic.loader("UserPermission",userPermissionResolver).mutations
  },
  
}