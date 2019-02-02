import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";
import getIdName from "./../../../framework/helpers/getIdName.js";

let userPermissionModel = new Model({
  models: models,
  tableName: "userpermission"
});

let userModel = new Model({
  models: models,
  tableName: "user"
});

let permissionModel = new Model({
  models: models,
  tableName: "permission"
});

export default {
  UserPermission: {
    async user(userPermission) {
      return await userModel.findOne({[getIdName]: userPermission.user});
    },
    async permission(userPermission) {
      console.log(await permissionModel.findOne({[getIdName]: userPermission.permission}))
      return await permissionModel.findOne({[getIdName]: userPermission.permission});
    }
  },
  queries: {
    listUserPermission: async (_, args, g) => {
      try {
        let paginate = await userPermissionModel.paginate(args);
        return paginate;
      } catch (e) {
        return internalServerError(e);
      }
    },
    userPermissionView: async (_, args, g) => {
      let v = await validate(validations.userPermission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let userPermission = await userPermissionModel.view(args);
        if (!userPermission) {
          throw new ApolloError("Not found",statusCodes.NOT_FOUND.number);
        }
        userPermission.statusCode = statusCodes.OK.type;
        userPermission.statusCodeNumber = statusCodes.OK.number;
        userPermission.successMessageType = "Success";
        userPermission.successMessage = "User permission fetched";
        return userPermission;

      } catch (e) {
        return internalServerError(e);
      }
    }
  },
  mutations: {
    createUserPermission: async (_, args, g) => {
      let v = await validate(validations.createUserPermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {

        let model = await userPermissionModel.create(args);
        model.statusCode = statusCodes.CREATED.type;
        model.statusCodeNumber = statusCodes.CREATED.number;
        model.successMessageType = "Success";
        model.successMessage = "User Permission created";
        return model;

      } catch (e) {
        return internalServerError(e);
      }
    },
    deleteUserPermission: async (_, args, g) => {
      let v = await validate(validations.deleteUserPermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let fakeResponse = {};
        await userPermissionModel.delete(args);
        fakeResponse.statusCode = statusCodes.CREATED.type;
        fakeResponse.statusCodeNumber = statusCodes.CREATED.number;
        fakeResponse.successMessageType = "Success";
        fakeResponse.successMessage = "User Permission deleted";
        return fakeResponse;
      } catch (e) {
        return internalServerError(e);
      }
    },
    updateUserPermission: async (_, args, g) => {
      let v = await validate(validations.updateUserPermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let update = await userPermissionModel.update(args);
        update.statusCode = statusCodes.OK.type;
        update.statusCodeNumber = statusCodes.OK.number;
        update.successMessageType = "Success";
        update.successMessage = "User permission updated";
        return update;

      } catch (e) {
        return internalServerError(e);
      }
    },
  },
  
}