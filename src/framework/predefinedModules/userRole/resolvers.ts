import validations from "./validations";
import dynamic from "./../../../framework/dynamic/index";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let { userRoleModel, userModel, roleModel } = allModels;

let userRoleResolver = dynamic.resolvers({
  moduleName: "UserRole",
  validations: {
    create: validations.createUserRole,
    delete: validations.deleteUserRole,
    update: validations.updateUserRole,
    view: validations.userRole
  },
  model: userRoleModel
});

export default {
  UserRole: {
    user: async (userRole: any) => {
      return await relateResolver({
        relateWith: userModel,
        model: userRole,
        relationName: "user",
        type: "single"
      });
    },
    role: async (userRole: any) => {
      return await relateResolver({
        relateWith: roleModel,
        model: userRole,
        relationName: "role",
        type: "single"
      });
    }
  },
  queries: {
    ...dynamic.loader("UserRole", userRoleResolver).queries
  },
  mutations: {
    ...dynamic.loader("UserRole", userRoleResolver).mutations
  }
};
