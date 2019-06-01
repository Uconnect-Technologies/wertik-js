import validations from "./validations.ts";
import dynamic from "./../../../framework/dynamic/index.ts";
import allModels from "./../../../framework/dynamic/allModels.ts";
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