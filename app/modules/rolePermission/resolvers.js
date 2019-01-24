import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";

let rolePermissionModel = new Model({
	models: models,
	tableName: "rolepermission"
});

export default {
  createRolePermission: async (args, req, schema) => {
    try {
      let v = await validate(validations.createRolePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }

      let model = await rolePermissionModel.create(args);
      model.statusCode = statusCodes.CREATED.type;
      model.statusCodeNumber = statusCodes.CREATED.number;
      model.successMessageType = "Success";
      model.successMessage = "Role Permission created";
      return model;

    } catch (e) {
      return internalServerError(e);
    }
  },
  deleteRolePermission: async (args, req, schema) => {
    try {
      let v = await validate(validations.deleteRolePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }
      let fakeResponse = {};
      await rolePermissionModel.delete(args);
      fakeResponse.statusCode = statusCodes.CREATED.type;
      fakeResponse.statusCodeNumber = statusCodes.CREATED.number;
      fakeResponse.successMessageType = "Success";
      fakeResponse.successMessage = "Role Permission deleted";
      return fakeResponse;
    } catch (e) {
      return internalServerError(e);
    }
  },
  updateRolePermission: async (args, req, schema) => {
    try {
      let v = await validate(validations.updateRolePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }

      let update = await rolePermissionModel.update(args);
      update.statusCode = statusCodes.OK.type;
      update.statusCodeNumber = statusCodes.OK.number;
      update.successMessageType = "Success";
      update.successMessage = "Role permission updated";
      return update;

    } catch (e) {
      return internalServerError(e);
    }
  },
  listRolePermission: async (args, req, sceham) => {
    try {
      let paginate = await rolePermissionModel.paginate(args);
      return paginate;
    } catch (e) {
      return internalServerError(e);
    }
  },
  rolePermission: async (args, req, schema) => {
    try {
      let v = await validate(validations.rolePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }
      let rolePermission = await rolePermissionModel.view(args);
      if (!rolePermission) {
        return {
          errors: ["Not Found"],
          statusCodeNumber: statusCodes.NOT_FOUND.number,
          statusCode: statusCodes.NOT_FOUND.type
        }
      }
      rolePermission.statusCode = statusCodes.OK.type;
      rolePermission.statusCodeNumber = statusCodes.OK.number;
      rolePermission.successMessageType = "Success";
      rolePermission.successMessage = "Role permission fetched";
      return rolePermission;

    } catch (e) {
      return internalServerError(e);
    }
  }
}