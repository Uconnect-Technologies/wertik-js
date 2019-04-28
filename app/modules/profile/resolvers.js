import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import getIdName from "./../../../framework/helpers/getIdName.js";
import dynamic from "./../../../framework/dynamic/index.js";
import allModels from "./../../../framework/dynamic/allModels.js";
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
			return await userModel.findOne({[getIdName]: profile.user })
		}
  },
  queries: {
    ...dynamic.loader("Profile",profileResolver).queries
  },
  mutations: {
    ...dynamic.loader("Profile",profileResolver).mutations
  },
}