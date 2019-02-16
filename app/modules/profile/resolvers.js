import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";
import {ApolloError} from "apollo-server";
import getIdName from "./../../../framework/helpers/getIdName.js";

let profileModel = new Model({
  models: models,
  tableName: "profile"
});

let userModel = new Model({
  models: models,
  tableName: "user"
});

export default {
	Profile: {
		async user(profile) {
			return await userModel.findOne({[getIdName]: profile.user })
		}
	},
	queries: {
		listProfile: async (_, args, g) => {
      try {
        let paginate = await profileModel.paginate(args);
        return paginate;
      } catch (e) {
        return internalServerError(e);
      }
    },
    profileView: async (_, args, g) => {
      let v = await validate(validations.profile,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let profile = await profileModel.view(args);
        if (!profile) {
          throw new ApolloError("Profile not found",statusCodes.NOT_FOUND.number);
        }
        return profile;
      } catch (e) {
        return internalServerError(e);
      }
    }
	},
	mutations: {
    createProfile: async (_, args, g) => {
      let v = await validate(validations.createProfile,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let model = await profileModel.create(args);
        return model;
      } catch (e) {
        return internalServerError(e);
      }
    },
    deleteProfile: async (_, args, g) => {
      let v = await validate(validations.deleteProfile,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let response = await profileModel.delete(args);
        return response;
      } catch (e) {
        return internalServerError(e);
      }
    },
    updateProfile: async (_, args, g) => {
      let v = await validate(validations.updateProfile,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let update = await profileModel.update(args);
        return update;
      } catch (e) {
        return internalServerError(e);
      }
    },
	}
}