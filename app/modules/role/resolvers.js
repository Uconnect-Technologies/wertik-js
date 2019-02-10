import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";
import {ApolloError} from "apollo-server";

let roleModel = new Model({
  models: models,
  tableName: "role"
});

let rolePermissionsModel = new Model({
  models: models,
  tableName: "rolepermission"
});

let permissionModel = new Model({
	models: models,
	tableName: "permission"
});

export default {
  Role: {
    async permissions() {
      return await rolePermissionsModel.paginate();
    }
  },
  queries: {
    listRole: async (_, args, g) => {
      try {
        let paginate = await roleModel.paginate(args);
        return paginate;
      } catch (e) {
        return internalServerError(e);
      }
    },
    roleView: async (_, args, g) => {
      let v = await validate(validations.role,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let role = await roleModel.view(args);
        if (!role) {
          throw new ApolloError("Role not found",statusCodes.NOT_FOUND.number)
        }
        role.successMessageType = "Success";
        role.successMessage = "Role fetched";
        return role;

      } catch (e) {
        return internalServerError(e);
      }
    }
  },
  mutations: {
    createRole: async (_, args, g) => {
      let v = await validate(validations.createRole,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {

        let model = await roleModel.create({name: args.name});
        model.successMessageType = "Success";
        model.successMessage = "Role created";
        return model;

      } catch (e) {
        return internalServerError(e);
      }
    },
    deleteRole: async (_, args, g) => {
      let v = await validate(validations.deleteRole,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let fakeResponse = {};
        await roleModel.delete(args);
        fakeResponse.successMessageType = "Success";
        fakeResponse.successMessage = "Role deleted";
        return fakeResponse;
      } catch (e) {
        return internalServerError(e);
      }
    },
    updateRole: async (_, args, g) => {
      let v = await validate(validations.updateRole,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let update = await roleModel.update(args);
        update.successMessageType = "Success";
        update.successMessage = "Role updated";
        return update;
      } catch (e) {
        return internalServerError(e);
      }
    },
  },

}