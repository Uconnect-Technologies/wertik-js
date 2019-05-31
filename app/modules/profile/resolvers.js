import validations from "./validations.js";
import dynamic from "./../../../framework/dynamic/index.js";
import allModels from "./../../../framework/dynamic/allModels.js";
import relateResolver from "./../../../framework/database/relateResolver.js";

let {userModel,profileModel} = allModels;


let profileResolver = dynamic.resolvers({
  moduleName: 'Profile',
  validations: {
    create: validations.createProfile,
    delete: validations.deleteProfile,
    update: validations.updateProfile,
    view: validations.profile
  },
  model: profileModel
});


export default {
	Profile: {
		async user(profile) {
      return await relateResolver(userModel,profile,'user');
		}
  },
  queries: {
    ...dynamic.loader("Profile",profileResolver).queries
  },
  mutations: {
    ...dynamic.loader("Profile",profileResolver).mutations
  },
}