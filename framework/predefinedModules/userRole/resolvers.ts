import validations from "./validations.ts";
import dynamic from "./../../../framework/dynamic/index.ts";
import allModels from "./../../../framework/dynamic/allModels.ts";
import relateResolver from "./../../../framework/database/relateResolver.ts";

let {userRoleModel,userModel,roleModel} = allModels;

let userRoleResolver = dynamic.resolvers({
  moduleName: 'UserRole',
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
    user: async (userRole) => {
      return await relateResolver(userModel,userRole,'user')
    },
    role: async (userRole) => {
      return await relateResolver(roleModel,userRole,'role')
    }
  },
  queries: {
    ...dynamic.loader("UserRole",userRoleResolver).queries
  },
  mutations: {
    ...dynamic.loader("UserRole",userRoleResolver).mutations
  },
  
}