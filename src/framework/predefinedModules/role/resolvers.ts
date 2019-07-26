import validations from "./validations";
import dynamic from "./../../../framework/dynamic/index";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

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
  Subscription: dynamic.loader("Role", roleResolver).subscriptions,
  Role: {
    async permissions(role: any) {
      // return await relateResolver(rolePermissionsModel,role,'permission',true);
    }
  },
  mutations: dynamic.loader("Role",roleResolver).mutations,
  queries: dynamic.loader("Role",roleResolver).queries
}