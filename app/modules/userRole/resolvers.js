import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import getIdName from "./../../../framework/helpers/getIdName.js";
import dynamic from "./../../../framework/dynamic/index.js";
import allModels from "./../../../framework/dynamic/allModels.js";
import {userRoleModel,userModel,roleModel} from "./../../../framework/dynamic/allModels.js";

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
    async user(userRole) {
      return await userModel.findOne({[getIdName]: userRole.user})
    },
    async role(userRole) {
      return await roleModel.findOne({[getIdName]: userRole.role})
    }
  },
  queries: {
    ...dynamic.loader("UserRole",userRoleResolver).queries
  },
  mutations: {
    ...dynamic.loader("UserRole",userRoleResolver).mutations
  },
  
}