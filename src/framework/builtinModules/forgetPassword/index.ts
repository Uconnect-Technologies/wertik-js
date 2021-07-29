import { requestPasswordResetHandler, resetPasswordHandler } from "./handlers";
import getRequestedFieldsFromResolverInfo from "./../../helpers/getRequestedFieldsFromResolverInfo";

export default {
  name: "ForgetPassword",
  graphql: {
    schema: `
      type ForgetPassword {
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
      input ForgetPasswordInput {
        id: Int
        name: String
        email: String
        user_id: Int
        token: String 
      }
     `,
    customResolvers: {},
    mutation: {
      schema: `
        requestPasswordReset(input: requestPasswordResetInput): SuccessResponse
        resetPassword(input: resetPasswordInput): SuccessResponse
      `,
      resolvers: {
        requestPasswordReset: async (
          _: any,
          args: any,
          context: any,
          info: any
        ) => {
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
          sourceKey: "user_id",
          as: "user",
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
  },
};
