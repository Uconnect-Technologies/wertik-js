import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import getIdName from "./../../../framework/helpers/getIdName.js";
import dynamic from "./../../../framework/dynamic/index.js";
import {userPermissionModel,userModel,permissionModel} from "./../../../framework/dynamic/allModels.js";


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
      return await userModel.findOne({[getIdName]: userPermission.user});
    },
    async permission(userPermission) {
      return await permissionModel.findOne({[getIdName]: userPermission.permission});
    }
  },
  queries: {
    ...dynamic.loader("UserPermission",userPermissionResolver).queries
  },
  
  mutations: {
    ...dynamic.loader("UserPermission",userPermissionResolver).mutations
  },
  
}