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
import dynamic from "./../../../framework/dynamic/index.js";

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

let userRoleResolver = dynamic.resolvers({
  moduleName: 'UserRole',
  validations: {
    create: validations.createUserRole,
    delete: validations.deleteUserRole,
    update: validations.updateUserRole,
    view: validations.userRole
  },
  model: userRoleModel
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
  queries: {
    listUserRole: async (_, args, g) => {
      return userRoleResolver.queries.listRole(_,args,g);
    },
    userRoleView: async (_, args, g) => {
      return userRoleResolver.queries.viewUserRole(_,args.input,g);
    }
  },
  mutations: {
    createUserRole: async (_, args, g) => {
      return userRoleResolver.mutations.createUserRole(_,args.input,g);
    },
    deleteUserRole: async (_, args, g) => {
      return userRoleResolver.mutations.deleteUserRole(_,args.input,g);
    },
    updateUserRole: async (_, args, g) => {
      return userRoleResolver.mutations.updateUserRole(_,args.input,g);
    },
  },
  
}