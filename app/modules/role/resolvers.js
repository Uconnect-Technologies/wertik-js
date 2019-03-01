import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import dynamic from "./../../../framework/dynamic/index.js";

let roleModel = new Model({
  models: models,
  tableName: "role"
});

let rolePermissionsModel = new Model({
  models: models,
  tableName: "rolepermission"
});

let roleResolver = dynamic.resolvers({
  moduleName: 'Role',
  validations: {
    create: validations.createRole,
    delete: validations.deleteRole,
    update: validations.updateRole,
    view: validations.role
  },
  model: roleModel
});

export default {
  Role: {
    async permissions() {
      return await rolePermissionsModel.paginate();
    }
  },
  queries: {
    listRole: async (_, args, g) => {
      return roleResolver.queries.listRole(_,args,g);
    },
    viewRole: async (_, args, g) => {
      return roleResolver.queries.viewRole(_,args.input,g);
    }
  },
  mutations: {
    createRole: async (_, args, g) => {
      return roleResolver.mutations.createRole(_,args.input,g);
    },
    deleteRole: async (_, args, g) => {
      return roleResolver.mutations.deleteRole(_,args.input,g);
    },
    updateRole: async (_, args, g) => {
      return roleResolver.mutations.updateRole(_,args.input,g);
    },
  },

}