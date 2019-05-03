import validations from "./validations.js";
import dynamic from "./../../../framework/dynamic/index.js";
import allModels from "./../../../framework/dynamic/allModels.js";
let {permissionModel} = allModels;

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