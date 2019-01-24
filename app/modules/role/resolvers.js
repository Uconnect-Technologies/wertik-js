import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";

let roleModel = new Model({
	models: models,
	tableName: "role"
});

export default {
  createRole: async (args, req, schema) => {
    try {
      let v = await validate(validations.createRole,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }

      let model = await roleModel.create({name: args.name});
      model.statusCode = statusCodes.CREATED.type;
      model.statusCodeNumber = statusCodes.CREATED.number;
      model.successMessageType = "Success";
      model.successMessage = "Role created";
      return model;

    } catch (e) {
      return internalServerError(e);
    }
  },
  deleteRole: async (args, req, schema) => {
    try {
      let v = await validate(validations.deleteRole,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }
      let fakeResponse = {};
      await roleModel.delete(args);
      fakeResponse.statusCode = statusCodes.CREATED.type;
      fakeResponse.statusCodeNumber = statusCodes.CREATED.number;
      fakeResponse.successMessageType = "Success";
      fakeResponse.successMessage = "Role deleted";
      return fakeResponse;
    } catch (e) {
      return internalServerError(e);
    }
  },
  updateRole: async (args, req, schema) => {
    try {
      let v = await validate(validations.updateRole,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }

      let update = await roleModel.update(args);
      update.statusCode = statusCodes.OK.type;
      update.statusCodeNumber = statusCodes.OK.number;
      update.successMessageType = "Success";
      update.successMessage = "Role updated";
      return update;

    } catch (e) {
      return internalServerError(e);
    }
  },
  listRole: async (args, req, sceham) => {
    try {
      let paginate = await roleModel.paginate(args);
      return paginate;
    } catch (e) {
      return internalServerError(e);
    }
  },
  role: async (args, req, schema) => {
    try {
      let v = await validate(validations.role,args,{abortEarly: false});
			let {success} = v;
			if (!success) {
				return {
					errors: v.errors,
					statusCode: statusCodes.BAD_REQUEST.type,
					statusCodeNumber: statusCodes.BAD_REQUEST.number
				}
      }
      let role = await roleModel.view(args);
      if (!role) {
        return {
          errors: ["Not Found"],
          statusCodeNumber: statusCodes.NOT_FOUND.number,
          statusCode: statusCodes.NOT_FOUND.type
        }
      }
      role.statusCode = statusCodes.OK.type;
      role.statusCodeNumber = statusCodes.OK.number;
      role.successMessageType = "Success";
      role.successMessage = "Role fetched";
      return role;

    } catch (e) {
      return internalServerError(e);
    }
  }
}