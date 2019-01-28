import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";

let permissionModel = new Model({
	models: models,
	tableName: "permission"
});

export default {
  createPermission: async (args, req, schema) => {
    try {
      let v = await validate(validations.createPermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }

      let model = await permissionModel.create({action: args.action});
      model.statusCode = statusCodes.CREATED.type;
      model.statusCodeNumber = statusCodes.CREATED.number;
      model.successMessageType = "Success";
      model.successMessage = "Permission created";
      return model;

    } catch (e) {
      console.log(1);
      return internalServerError(e);
    }
  },
  deletePermission: async (args, req, schema) => {
    try {
      let v = await validate(validations.deletePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }
      let fakeResponse = {};
      await permissionModel.delete(args);
      fakeResponse.statusCode = statusCodes.CREATED.type;
      fakeResponse.statusCodeNumber = statusCodes.CREATED.number;
      fakeResponse.successMessageType = "Success";
      fakeResponse.successMessage = "Permission deleted";
      return fakeResponse;
    } catch (e) {
      return internalServerError(e);
    }
  },
  updatePermission: async (args, req, schema) => {
    try {
      let v = await validate(validations.updatePermission,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }

      let update = await permissionModel.update(args);
      update.statusCode = statusCodes.OK.type;
      update.statusCodeNumber = statusCodes.OK.number;
      update.successMessageType = "Success";
      update.successMessage = "Permission updated";
      return update;

    } catch (e) {
      return internalServerError(e);
    }
  },
  listPermission: async (args, req, sceham) => {
    try {
      let paginate = await permissionModel.paginate(args);
      return paginate;
    } catch (e) {
      return internalServerError(e);
    }
  },
  permissionView: async (args, req, schema) => {
    try {
      let v = await validate(validations.permission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        return {
          errors: v.errors,
          statusCode: statusCodes.BAD_REQUEST.type,
          statusCodeNumber: statusCodes.BAD_REQUEST.number
        }
      }
      let permission = await permissionModel.view(args);
      if (!permission) {
        return {
          errors: ["Not Found"],
          statusCodeNumber: statusCodes.NOT_FOUND.number,
          statusCode: statusCodes.NOT_FOUND.type
        }
      }
      permission.statusCode = statusCodes.OK.type;
      permission.statusCodeNumber = statusCodes.OK.number;
      permission.successMessageType = "Success";
      permission.successMessage = "Permission fetched";
      return permission;

    } catch (e) {
      return internalServerError(e);
    }
  }
}