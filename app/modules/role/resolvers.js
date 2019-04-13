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
  mutations: {
    ...dynamic.loader("Role",roleResolver).mutations
  },
  queries: {
    ...dynamic.loader("Role",roleResolver).queries
  }
}


console.log(dynamic.loader("Role",roleResolver).mutations)