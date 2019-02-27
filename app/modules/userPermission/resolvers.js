import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import getIdName from "./../../../framework/helpers/getIdName.js";
import dynamic from "./../../../framework/dynamic/index.js";

let userPermissionModel = new Model({
  models: models,
  tableName: "userpermission"
});

let userModel = new Model({
  models: models,
  tableName: "user"
});

let permissionModel = new Model({
  models: models,
  tableName: "permission"
});


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
    listUserPermission: async (_, args, g) => {
      return userPermissionResolver.queries.listUserPermission(_,args,g);
    },
    viewUserPermission: async (_, args, g) => {
      return userPermissionResolver.queries.viewUserPermission(_,args.input,g);
    }
  },
  
  mutations: {
    createUserPermission: async (_, args, g) => {
      return userPermissionResolver.mutations.createUserPermission(_,args.input,g);
    },
    deleteUserPermission: async (_, args, g) => {
      return userPermissionResolver.mutations.deleteUserPermission(_,args.input,g);
    },
    updateUserPermission: async (_, args, g) => {
      return userPermissionResolver.mutations.updateUserPermission(_,args.input,g);
    },
  },
  
}