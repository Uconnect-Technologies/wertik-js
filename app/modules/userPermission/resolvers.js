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
      let {success} = await validate(validations.userPermission,args,{abortEarly: false});
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let userPermission = await userPermissionModel.view(args);
        if (!userPermission) {
          throw new ApolloError("Not found",statusCodes.NOT_FOUND.number);
        }
        return userPermission;
      } catch (e) {
        return internalServerError(e);
      }
    }
  },
  mutations: {
    createUserPermission: async (_, args, g) => {
      let {success} = await validate(validations.createUserPermission,args,{abortEarly: false});
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        return await userPermissionModel.create(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
    deleteUserPermission: async (_, args, g) => {
      let {success} = await validate(validations.deleteUserPermission,args,{abortEarly: false});
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        return await userPermissionModel.delete(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
    updateUserPermission: async (_, args, g) => {
      let {success} = await validate(validations.updateUserPermission,args,{abortEarly: false});
			if (!success) {
				throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        return await userPermissionModel.update(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
  },
  
}