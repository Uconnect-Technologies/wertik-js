import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import {ApolloError} from "apollo-server";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";
import getIdName from "./../../../framework/helpers/getIdName.js";

let userRoleModel = new Model({
  models: models,
  tableName: "userrole"
});

let userModel = new Model({
  models: models,
  tableName: "user"
});

let roleModel = new Model({
	models: models,
	tableName: "role"
});

export default {
  UserRole: {
    async user(userRole) {
      return await userModel.findOne({[getIdName]: userRole.user})
    },
    async role(userRole) {
      return await roleModel.findOne({[getIdName]: userRole.role})
    }
  },
  mutations: {
     createUserRole: async (_, args, g) => {
      let v = await validate(validations.createUserRole,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        return await userRoleModel.create(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
    deleteUserRole: async (_, args, g) => {
      let v = await validate(validations.deleteUserRole,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        return await userRoleModel.delete(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
    updateUserRole: async (_, args, g) => {
      let v = await validate(validations.updateUserRole,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        return await userRoleModel.update(args);
      } catch (e) {
        return internalServerError(e);
      }
    },
  },
  queries: {
    listUserRole: async (args, req, sceham) => {
        try {
          let paginate = await userRoleModel.paginate(args);
          return paginate;
        } catch (e) {
          return internalServerError(e);
        }
      },
      userRoleView: async (_, args, g) => {
        let v = await validate(validations.userRole,args,{abortEarly: false});
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          let userRole = await userRoleModel.view(args);
          if (!userRole) {
            throw new ApolloError("Not found",statusCodes.BAD_REQUEST.number)
          }
          return userRole;
        } catch (e) {
          return internalServerError(e);
        }
      }
  },
 
  
}