import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";
import {ApolloError} from "apollo-server";

let permissionModel = new Model({
  models: models,
  tableName: "permission"
});

let userModel = new Model({
	models: models,
	tableName: "user"
});

export default {
  queries: {
    listPermission: async (_, args, g) => {
      try {
        let paginate = await permissionModel.paginate(args);
        return paginate;
      } catch (e) {
        return internalServerError(e);
      }
    },
    permissionView: async (_, args, g) => {
      let v = await validate(validations.permission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let permission = await permissionModel.view(args);
        if (!permission) {
          throw new ApolloError("Validation error",statusCodes.NOT_FOUND.number);
        }
        return permission;

      } catch (e) {
        return internalServerError(e);
      }
    }
  },
  mutations: {
    createPermission: async (_, args, g) => {
      let v = await validate(validations.createPermission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let model = await permissionModel.create({action: args.action});
        return model;
      } catch (e) {
        return internalServerError(e);
      }
    },
    deletePermission: async (_, args, g) => {
      let v = await validate(validations.deletePermission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let response = await permissionModel.delete(args);
        return response;
      } catch (e) {
        return internalServerError(e);
      }
    },
    updatePermission: async (_, args, g) => {
      let v = await validate(validations.updatePermission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let update = await permissionModel.update(args);
        return update;
      } catch (e) {
        return internalServerError(e);
      }
    },
  },
 
}