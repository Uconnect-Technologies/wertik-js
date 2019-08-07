import validations from "./validations";
import dynamic from "./../../../framework/dynamic/index";
//@ts-ignore
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let { userPermissionModel, permissionModel, roleModel } = allModels;

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
  Subscription: dynamic.loader("UserPermission", userPermissionResolver)
    .subscriptions,
  UserPermission: {},
  queries: dynamic.loader("UserPermission", userPermissionResolver).queries,
  mutations: dynamic.loader("UserPermission", userPermissionResolver).mutations
};
