import validations from "./validations";
import dynamic from "./../../../framework/dynamic/index";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

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
  Subscription: dynamic.loader("Role", userPermissionResolver).subscriptions,
  UserPermission: {
    async user(userPermission: any) {
      return await relateResolver(userModel,userPermission,'user')
    },
    async permission(userPermission: any) {
      return await relateResolver(permissionModel,userPermission,'permission')
    }
  },
  queries: dynamic.loader("UserPermission",userPermissionResolver).queries,
  mutations: dynamic.loader("UserPermission",userPermissionResolver).mutations
  
}