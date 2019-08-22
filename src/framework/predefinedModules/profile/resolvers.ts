import dynamic from "./../../../framework/dynamic/index";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";

let { userModel, profileModel } = allModels;

let profileResolver = dynamic.resolvers({
  moduleName: "Profile",
  model: profileModel
});

export default {
  Subscription: dynamic.loader("Role", profileResolver).subscriptions,
  Profile: {
    async user(profile: any) {
      // return await relateResolver(userModel,profile,'user');
    }
  },
  queries: dynamic.loader("Profile", profileResolver).queries,
  mutations: dynamic.loader("Profile", profileResolver).mutations
};
