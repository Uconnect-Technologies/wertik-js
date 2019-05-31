import validations from "./validations.js";
import dynamic from "./../../../framework/dynamic/index.js";
import allModels from "./../../../framework/dynamic/allModels.js";
import relateResolver from "./../../../framework/database/relateResolver.js";
let {roleModel, rolePermissionsModel} = allModels;

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
    async permissions(role) {
      return await relateResolver(rolePermissionsModel,role,'permission',true);
    }
  },
  mutations: {
    ...dynamic.loader("Role",roleResolver).mutations
  },
  queries: {
    ...dynamic.loader("Role",roleResolver).queries
  }
}