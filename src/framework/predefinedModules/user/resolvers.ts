let bcrypt = require("bcrypt-nodejs");
let { ApolloError } = require("apollo-server");

import internalServerError from "./../../../framework/helpers/internalServerError";
import validations from "./validations";
import validate from "./../../../framework/validations/validate";
import statusCodes from "./../../../framework/helpers/statusCodes";
import dynamic from "./../../../framework/dynamic/index";
import { sendEmail } from "./../../../framework/mailer/index";
import allModels from "./../../../framework/dynamic/allModels";
import relateResolver from "./../../../framework/database/relateResolver";
import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";

let { userModel, profileModel, userRoleModel, userPermissionModel } = allModels;

let userResolver = dynamic.resolvers({
  moduleName: "User",
  restricedColumns: ["assignedRoles", "assignedPermissions"],
  validations: {
    delete: validations.deleteUser,
    update: validations.updateUser,
    view: validations.viewUser
  },
  model: userModel
});

let userDynamic = dynamic.loader("User", userResolver);
let userQueries = userDynamic.queries;
let userMutations = userDynamic.mutations;

export default {
  User: {
    async assignedRoles(user: any, a, b) {
      return await relateResolver({
        relateWith: userRoleModel,
        model: user,
        relationName: "user",
        type: "multiple"
      });
    },
    async assignedPermissions(user: any, a, b) {
      return await relateResolver({
        relateWith: userPermissionModel,
        model: user,
        relationName: "user",
        type: "multiple"
      });
    },
    async profile(user: any) {
      return await relateResolver({
        relateWith: profileModel,
        model: user,
        relationName: "profile",
        type: "single"
      });
    }
  },
  queries: {
    listUser: userQueries.listUser,
    viewUser: userQueries.viewUser,
    me: async (_: any, args: any, context: any, info: any) => context.user
  },
  mutations: {
    changePassword: async (_: any, args: any, g: any) => {
      let v = await validate(validations.changePassword, args);
      if (!v.success) {
        return new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors });
      }
      try {
        let user = await userModel.view(args);
        if (!user) {
          return new ApolloError("User not found", statusCodes.BAD_REQUEST.number);
        }
        let correctPassword = bcrypt.compareSync(args.oldPassword, user.password);
        if (!correctPassword) {
          return new ApolloError("Password incorrect", statusCodes.BAD_REQUEST.number);
        }
        await user.update({
          password: bcrypt.hashSync(args.newPassword)
        });
        await sendEmail(
          "changePassword.hbs",
          {
            userName: user.email,
            siteName: process.env.NAME,
            email: user.email
          },
          {
            from: process.env.MAILER_SERVICE_USERNAME,
            to: user.email,
            subject: "Password changed"
          }
        );
        let response: any = {};
        return response;
      } catch (e) {
        return internalServerError(e);
      }
    },
    deleteUser: userMutations.deleteUser,
    updateUser: userMutations.updateUser,
    deleteBulkUser: userMutations.deleteBulkUser,
    updateBulkUser: userMutations.updateBulkUser
  }
};
