const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import { requestPasswordResetHandler, resetPasswordHandler } from "./handlers";
import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";

export default {
  name: "ForgetPassword",
  graphql: {
    crud: {
      query: {
        generate: true,
        operations: "view",
      },

      mutation: {
        generate: false,
        operations: "*",
      },
    },
    schema: `
      type ForgetPassword {
        _id: String
        id: Int
        name: String
        email: String
        user: User
        user_id: Int
        token: String
        created_at: String
        updated_at: String
      }
      input requestPasswordResetInput {
        email: String!
      }
      input resetPasswordInput {
        token: String!
        password: String!
        confirmPassword: String!
      }
     `,
    customResolvers: {},
    mutation: {
      schema: `
        requestPasswordReset(input: requestPasswordResetInput): SuccessResponse
        resetPassword(input: resetPasswordInput): SuccessResponse
      `,
      resolvers: {
        requestPasswordReset: async (_: any, args: any, context: any, info: any) => {
          return await requestPasswordResetHandler({
            userModel: context.wertik.models.User,
            forgetPasswordModel: context.wertik.models.ForgetPassword,
            data: args.input,
            emailTemplates: context.wertik.emailTemplates,
            sendEmail: context.wertik.sendEmail,
          });
        },
        resetPassword: async (_: any, args: any, context: any, info: any) => {
          return await resetPasswordHandler({
            userModel: context.wertik.models.User,
            forgetPasswordModel: context.wertik.models.ForgetPassword,
            data: args.input,
          });
        },
      },
    },
    query: {
      schema: ``,
      resolvers: {},
    },
  },
  restApi: {
    endpoints: [
      {
        path: "/request-password-reset",
        methodType: "post",
        handler: async function (req, res) {
          try {
            let response = await requestPasswordResetHandler({
              userModel: req.wertik.models.User,
              forgetPasswordModel: req.wertik.models.ForgetPassword,
              data: req.body.input,
              emailTemplates: req.wertik.emailTemplates,
              sendEmail: req.wertik.sendEmail,
            });
            res.json({
              message: response,
            });
          } catch (e) {
            res.json({
              success: false,
              message: e.message,
              result: {},
            });
          }
        },
      },
      {
        path: "/reset-password",
        methodType: "post",
        handler: async function (req, res) {
          try {
            let response = await resetPasswordHandler({
              userModel: req.wertik.models.User,
              forgetPasswordModel: req.wertik.models.ForgetPassword,
              data: req.body.input,
            });
            res.json({
              message: response,
            });
          } catch (e) {
            res.json({
              success: false,
              message: e.message,
              result: {},
            });
          }
        },
      },
    ],
  },
  database: {
    selectIgnoreFields: ["user"],
    relationships: {
      oneToOne: {
        User: {
          relationColumn: "user_id",
          graphqlName: "user",
          foreignKey: "id",
        },
      },
    },
    sql: {
      tableName: "forgetPassword",
      fields: {
        name: {
          type: "String",
        },
        email: {
          type: "String",
        },
        user_id: {
          type: "Integer",
        },
        token: {
          type: "String",
        },
        is_deleted: {
          type: "INTEGER",
        },
      },
    },
    mongodb: {
      tableName: "forgetPassword",
      schema: {
        name: {type: String},
        email: {type: String},
        user: { type: Schema.Types.ObjectId, ref: "user" },
        user_id: {type: Number},
        token: {type: String},
        is_deleted: {type: Number},
        created_at: {type: String},
        updated_at: {type: String},
      },
    },
  },
};
