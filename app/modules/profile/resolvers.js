import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import getIdName from "./../../../framework/helpers/getIdName.js";
import dynamic from "./../../../framework/dynamic/index.js";

let profileModel = new Model({
  models: models,
  tableName: "profile"
});

let userModel = new Model({
  models: models,
  tableName: "user"
});

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
    listProfile: async (_, args, g) => {
      return profileResolver.queries.listProfile(_,args,g);
    },
    profileView: async (_, args, g) => {
      return profileResolver.queries.viewProfile(_,args.input,g);
    }
  },
  mutations: {
    createProfile: async (_, args, g) => {
      return profileResolver.mutations.createProfile(_,args.input,g);
    },
    deleteProfile: async (_, args, g) => {
      return profileResolver.mutations.deleteProfile(_,args.input,g);
    },
    updateProfile: async (_, args, g) => {
      return profileResolver.mutations.updateProfile(_,args.input,g);
    },
  },
}