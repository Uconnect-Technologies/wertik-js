"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
exports.default = {
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
                requestPasswordReset: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield handlers_1.requestPasswordResetHandler({
                        userModel: context.wertik.models.User,
                        forgetPasswordModel: context.wertik.models.ForgetPassword,
                        data: args.input,
                        emailTemplates: context.wertik.emailTemplates,
                        sendEmail: context.wertik.sendEmail,
                    });
                }),
                resetPassword: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield handlers_1.resetPasswordHandler({
                        userModel: context.wertik.models.User,
                        forgetPasswordModel: context.wertik.models.ForgetPassword,
                        data: args.input,
                    });
                }),
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
                handler: function (req, res) {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            let response = yield handlers_1.requestPasswordResetHandler({
                                userModel: req.wertik.models.User,
                                forgetPasswordModel: req.wertik.models.ForgetPassword,
                                data: req.body.input,
                                emailTemplates: req.wertik.emailTemplates,
                                sendEmail: req.wertik.sendEmail,
                            });
                            res.json({
                                message: response,
                            });
                        }
                        catch (e) {
                            res.json({
                                success: false,
                                message: e.message,
                                result: {},
                            });
                        }
                    });
                },
            },
            {
                path: "/reset-password",
                methodType: "post",
                handler: function (req, res) {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            let response = yield handlers_1.resetPasswordHandler({
                                userModel: req.wertik.models.User,
                                forgetPasswordModel: req.wertik.models.ForgetPassword,
                                data: req.body.input,
                            });
                            res.json({
                                message: response,
                            });
                        }
                        catch (e) {
                            res.json({
                                success: false,
                                message: e.message,
                                result: {},
                            });
                        }
                    });
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
//# sourceMappingURL=index.js.map