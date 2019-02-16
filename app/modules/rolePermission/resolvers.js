import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import getIdName from "./../../../framework/helpers/getIdName.js";
import dynamic from "./../../../framework/dynamic/index.js";

let rolePermissionModel = new Model({
  models: models,
  tableName: "rolepermission"
});

let permissionModel = new Model({
  models: models,
  tableName: "permission"
});

let roleModel = new Model({
	models: models,
	tableName: "role"
});

let rolePermissionResolver = dynamic.resolvers({
  moduleName: 'RolePermission',
  validations: {
    create: validations.createRolePermission,
    delete: validations.deleteRolePermission,
    update: validations.updateRolePermission,
    view: validations.rolePermission
  },
  model: rolePermissionModel
});


export default {
  RolePermission: {
    async permission(rolePermission) {
      return await permissionModel.findOne({[getIdName]: rolePermission.permission})
    },
    async role(rolePermission) {
      return await roleModel.findOne({[getIdName]: rolePermission.role})
    }
  },
  queries: {
    listRolePermission: async (_, args, g) => {
      return rolePermissionResolver.queries.listRolePermission(_,args,g);
    },
    rolePermissionView: async (_, args, g) => {
      return rolePermissionResolver.queries.viewRolePermission(_,args.input,g);
    }
  },
  mutations: {
    createRolePermission: async (_, args, g) => {
      return rolePermissionResolver.mutations.createRolePermission(_,args.input,g);
    },
    deleteRolePermission: async (_, args, g) => {
      return rolePermissionResolver.mutations.deleteRolePermission(_,args.input,g);
    },
    updateRolePermission: async (_, args, g) => {
      return rolePermissionResolver.mutations.updateRolePermission(_,args.input,g);
    },
  },
  
}