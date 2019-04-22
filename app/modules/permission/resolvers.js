import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import dynamic from "./../../../framework/dynamic/index.js";

let permissionModel = new Model({
  models: models,
  tableName: "permission"
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
    ...dynamic.loader("Permission",permissionResolver).queries
  },
  mutations: {
    ...dynamic.loader("Permission",permissionResolver).mutations
  },
 
}