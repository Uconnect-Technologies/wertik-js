import validations from "./validations";
import dynamic from "./../../../framework/dynamic/index";
//@ts-ignore
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let { userPermissionModel, permissionModel, roleModel, userModel } = allModels;

let userPermissionResolver = dynamic.resolvers({
  moduleName: "UserPermission",
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
    async user(userPermission: any) {
      return await relateResolver({
        relateWith: userModel,
        model: userPermission,
        relationName: "user",
        type: "single"
      });
    },
    async permission(userPermission: any) {
      return await relateResolver({
        relateWith: permissionModel,
        model: userPermission,
        relationName: "permission",
        type: "single"
      });
    }
  },
  Subscription: dynamic.loader("UserPermission", userPermissionResolver).subscriptions,
  queries: dynamic.loader("UserPermission", userPermissionResolver).queries,
  mutations: dynamic.loader("UserPermission", userPermissionResolver).mutations
};
