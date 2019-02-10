import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";
import getIdName from "./../../../framework/helpers/getIdName.js";
import {ApolloError} from "apollo-server";

let rolePermissionModel = new Model({
  models: models,
  tableName: "rolepermission"
});

let permissionModel = new Model({
  models: models,
  tableName: "permission"
});

let roleModel = new Model({
	models: models,
	tableName: "role"
});

export default {
  RolePermission: {
    async permission(rolePermission) {
      return await permissionModel.findOne({[getIdName]: rolePermission.permission})
    },
    async role(rolePermission) {
      return await roleModel.findOne({[getIdName]: rolePermission.role})
    }
  },
  queries: {
    listRolePermission: async (_, args, g) => {
      try {
        let paginate = await rolePermissionModel.paginate(args);
        return paginate;
      } catch (e) {
        return internalServerError(e);
      }
    },
    rolePermissionView: async (_, args, g) => {
      let v = await validate(validations.rolePermission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let rolePermission = await rolePermissionModel.view(args);
        if (!rolePermission) {
          throw new ApolloError("Validation error",statusCodes.NOT_FOUND.number,{list: ["Role permission view."]})
        }
        return rolePermission;

      } catch (e) {
        return internalServerError(e);
      }
    }
  },
  mutations: {
    createRolePermission: async (_, args, g) => {
      let v = await validate(validations.createRolePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation Errors",statusCodes.BAD_REQUEST.number,{list: v.errors});
      }
      try {
        let model = await rolePermissionModel.create(args);
        return model;

      } catch (e) {
        return internalServerError(e);
      }
    },
    deleteRolePermission: async (_, args, g) => {
      let v = await validate(validations.deleteRolePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation Errors",statusCodes.BAD_REQUEST.number,{list: v.errors});
      }
      try {
        return await rolePermissionModel.delete(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
    updateRolePermission: async (_, args, g) => {
      let v = await validate(validations.updateRolePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				throw new ApolloError("Validation Errors",statusCodes.BAD_REQUEST.number,{list: v.errors});
      }
      try {
        return await rolePermissionModel.update(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
  },
  
}