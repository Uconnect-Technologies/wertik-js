let moment = require("moment");
let bcrypt = require("bcrypt-nodejs");
let { ApolloError } = require("apollo-server");

import internalServerError from "./../../../framework/helpers/internalServerError";
import statusCodes from "./../../../framework/helpers/statusCodes";
import { sendEmail } from "./../../../framework/mailer/index";
import allModels from "./../../../framework/dynamic/allModels";

let { forgetPasswordModel, userModel } = allModels;

export default {
  queries: {
    forgetPasswordView: async (_: any, args: any, g: any) => {
      try {
        let forgetPassword = await forgetPasswordModel.findOne({ token: args.token });
        if (!forgetPassword) {
          return new ApolloError("Token expired or not found.", statusCodes.NOT_FOUND.number);
        }
        forgetPassword.statusCode = statusCodes.OK.type;
        forgetPassword.statusCodeNumber = statusCodes.OK.number;
        return forgetPassword;
      } catch (e) {
        return internalServerError(e);
      }
    }
  },
  mutations: {
    requestPasswordReset: async (_: any, args: any, g: any) => {
      try {
        let user = await userModel.findOne({ email: args.email });
        if (!user) {
          return new ApolloError("User not found", statusCodes.NOT_FOUND.number);
        }
        let token =
          Math.random()
            .toString(36)
            .substring(2) +
          Math.random()
            .toString(36)
            .substring(2) +
          Math.random()
            .toString(36)
            .substring(2);
        await forgetPasswordModel.create({
          token: token,
          email: args.email,
          expireDate: `${moment()
            .add("30", "minutes")
            .valueOf()}`
        });
        await sendEmail(
          "requestPasswordResetToken.hbs",
          {
            email: args.email,
            returnUrl: process.env.frontendAppUrl,
            token: token,
            frontendAppPasswordResetUrl: process.env.frontendAppPasswordResetUrl,
            nextMinutes: moment()
              .add("30", "minutes")
              .format("dddd, MMMM Do YYYY, h:mm:ss a"),
            siteName: process.env.name
          },
          {
            from: process.env.mailerServiceUsername,
            to: args.email,
            subject: "Reset your email"
          }
        );
        return {
          email: args.email,
          statusCode: statusCodes.CREATED.type
        };
      } catch (e) {
        return internalServerError(e);
      }
    },
    resetPassword: async (_: any, args: any, g: any) => {
      try {
        let forgetPassword = await forgetPasswordModel.findOne({ token: args.token });
        if (!forgetPassword) {
          return new ApolloError("Token Expired", statusCodes.NOT_FOUND.number);
        }
        let user = await userModel.findOne({ email: forgetPassword.email });
        if (!forgetPassword) {
          return new ApolloError("User not foundd", statusCodes.NOT_FOUND.number);
        }
        let hash = bcrypt.hashSync(args.password);
        await user.update({
          password: hash
        });
        await forgetPasswordModel.delete(forgetPassword);
        await sendEmail(
          "changePassword.hbs",
          {
            userName: user.email,
            siteName: process.env.name,
            email: user.email
          },
          {
            from: process.env.mailerServiceUsername,
            to: user.email,
            subject: "Password changed"
          }
        );
        return {
          statusCode: statusCodes.OK.type,
          statusCodeNumber: statusCodes.OK.number
        };
      } catch (e) {
        return internalServerError(e);
      }
    }
  }
};
