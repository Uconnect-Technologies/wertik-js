import validations from "./validations.js";
import dynamic from "./../../../framework/dynamic/index.js";
import {roleModel,rolePermissionsModel} from "./../../../framework/dynamic/allModels.js";

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
  mutations: {
    ...dynamic.loader("Role",roleResolver).mutations
  },
  queries: {
    ...dynamic.loader("Role",roleResolver).queries
  }
}