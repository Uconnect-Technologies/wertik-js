import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";

let userRoleModel = new Model({
	models: models,
	tableName: "userrole"
});

export default {
  createUserRole: async (args, req, schema) => {
    try {
      let v = await validate(validations.createUserRole,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }

      let model = await userRoleModel.create(args);
      model.statusCode = statusCodes.CREATED.type;
      model.statusCodeNumber = statusCodes.CREATED.number;
      model.successMessageType = "Success";
      model.successMessage = "User role created";
      return model;

    } catch (e) {
      return internalServerError(e);
    }
  },
  deleteUserRole: async (args, req, schema) => {
    try {
      let v = await validate(validations.deleteUserRole,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }
      let fakeResponse = {};
      await userRoleModel.delete(args);
      fakeResponse.statusCode = statusCodes.CREATED.type;
      fakeResponse.statusCodeNumber = statusCodes.CREATED.number;
      fakeResponse.successMessageType = "Success";
      fakeResponse.successMessage = "User Role deleted";
      return fakeResponse;
    } catch (e) {
      return internalServerError(e);
    }
  },
  updateUserRole: async (args, req, schema) => {
    try {
      let v = await validate(validations.updateUserRole,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }

      let update = await userRoleModel.update(args);
      update.statusCode = statusCodes.OK.type;
      update.statusCodeNumber = statusCodes.OK.number;
      update.successMessageType = "Success";
      update.successMessage = "User Role updated";
      return update;

    } catch (e) {
      return internalServerError(e);
    }
  },
  listUserRole: async (args, req, sceham) => {
    try {
      let paginate = await userRoleModel.paginate(args);
      return paginate;
    } catch (e) {
      return internalServerError(e);
    }
  },
  userRole: async (args, req, schema) => {
    try {
      let v = await validate(validations.userRole,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }
      let userRole = await userRoleModel.view(args);
      if (!userRole) {
        return {
          errors: ["Not Found"],
          statusCodeNumber: statusCodes.NOT_FOUND.number,
          statusCode: statusCodes.NOT_FOUND.type
        }
      }
      userRole.statusCode = statusCodes.OK.type;
      userRole.statusCodeNumber = statusCodes.OK.number;
      userRole.successMessageType = "Success";
      userRole.successMessage = "User Role fetched";
      return userRole;

    } catch (e) {
      return internalServerError(e);
    }
  }
}