import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import dynamic from "./../../../framework/dynamic/index.js";

let permissionModel = new Model({
  models: models,
  tableName: "permission"
});

let userModel = new Model({
	models: models,
	tableName: "user"
});

let permissionResolver = dynamic.resolvers({
  moduleName: 'Permission',
  validations: {
    create: validations.createPermission,
    delete: validations.deletePermission,
    update: validations.updatePermission,
    view: validations.permission
  },
  model: permissionModel
});

export default {
  queries: {
    listPermission: async (_, args, g) => {
      return permissionResolver.queries.listPermission(_,args,g);
    },
    viewPermission: async (_, args, g) => {
      return permissionResolver.queries.viewPermission(_,args.input,g);
    }
  },
  mutations: {
    createPermission: async (_, args, g) => {
      return permissionResolver.mutations.createPermission(_,args.input,g);
    },
    updatePermission: async (_, args, g) => {
      return permissionResolver.mutations.updatePermission(_,args.input,g);
    },
    deletePermission: async (_, args, g) => {
      return permissionResolver.mutations.deletePermission(_,args.input,g);
    },
  },
 
}