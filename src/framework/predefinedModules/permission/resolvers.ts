import dynamic from "./../../../framework/dynamic/index";
import allModels from "./../../../framework/dynamic/allModels";
let { permissionModel } = allModels;

let permissionResolver = dynamic.resolvers({
  moduleName: "Permission",
  model: permissionModel
});

export default {
  Subscription: dynamic.loader("Role", permissionResolver).subscriptions,
  queries: dynamic.loader("Permission", permissionResolver).queries,
  mutations: dynamic.loader("Permission", permissionResolver).mutations
};
