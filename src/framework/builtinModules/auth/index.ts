let bcrypt = require("bcrypt-nodejs");
import moment from "moment";
import statusCodes from "./../../../framework/helpers/statusCodes";
import createJwtToken from "./../../../framework/security/createJwtToken";
import {ApolloError} from "apollo-server";
import {get} from "lodash";

import {login, signup, loginWithAccessToken , activateAccount,refreshTokenHandler, twoFactorLogin, twoFactorLoginValidate} from "./handlers/index"

export default {
    name: "Auth",
    useDatabase: false,
    graphql: {
        crud: {
            query: {
                generate: false,
                operations: "*"
            },
            mutation: {
                generate: false,
                operations: "*"
            }
        },
        schema: `
            input TwoFactorCodeInput {
                twoFactorCode: String!
            }
            input AccessTokenInput {
                accessToken: String!
            }
            input ActivationTokenInput {
                activationToken: String!
            }
            input RefreshTokenInput {
                refreshToken: String!
            }
            input loginInput {
                email: String!
                password: String!
            }
        `,
        mutation: {
            schema: `
                twoFactorLogin(input: EmailInput): SuccessReponse
                twoFactorLoginValidate(input: TwoFactorCodeInput): User
                loginWithAccessToken(input: AccessTokenInput): User
                activateAccount(input: ActivationTokenInput): User
                signup(input: SignupInput): User
                login(input: loginInput): User
                refreshToken(input: RefreshTokenInput): User
            `,
            resolvers: {
                twoFactorLogin:  async (_:any, args:any, context:any,info: any) => {
                    return await twoFactorLogin({
                        userModel: context.models['User'],
                        emailTemplates: context.emailTemplates,
                        sendEmail: context.sendEmail,
                        data: args.input
                    });
                },
                twoFactorLoginValidate:  async (_:any, args:any, context:any,info: any) => {
                    return await twoFactorLoginValidate({
                        userModel: context.models['User'],
                        data: args.input
                    });
                },
                loginWithAccessToken:  async (_:any, args:any, context:any,info: any) => {
                  return await loginWithAccessToken({
                    userModel: context.models['User'],
                    data: args.input
                  });
                },
                activateAccount:  async (_:any, args:any, context:any,info: any) => {
                    return await activateAccount({
                        userModel: context.models['User'],
                        emailTemplates: context.emailTemplates,
                        sendEmail: context.sendEmail,
                        data: args.input
                    });
                },
                signup:  async (_:any, args:any, context:any,info: any) => {
                    return await signup({
                        userModel: context.models['User'], 
                        emailTemplates: context.emailTemplates,
                        sendEmail: context.sendEmail,
                        data: args.input
                    });
                },
                login:  async (_:any, args:any, context:any,info: any) => {
                    return await login({userModel: context.models['User'], data: args.input});
                },
                refreshToken:  async (_:any, args:any, context:any,info: any) => {
                    return await refreshTokenHandler({userModel: context.models['User'], data: args.input});
                }
            }
        },
        query: {
            schema: ``,
            resolvers: {
                
            }
        }
    },
    restApi: {
        endpoints: [
            {
                path: '/two-factor-login',
                methodType: 'post',
                docs: {
                  description: "A long description",
                  params: "",
                  title: "Two factor login"
                },
                handler: async function (req, res) {
                    try {
                        let response = await twoFactorLogin({
                            userModel: req.models['User'],
                            emailTemplates: req.emailTemplates,
                            sendEmail: req.sendEmail,
                            data: req.body
                        });
                        res.json({
                            success: true,
                            message: "Activate account",
                            result: response
                        });
                    } catch (e) {
                        res.json({
                            success: false,
                            message: e.message,
                            result: {}
                        })
                    }
                }
            },
            {
                path: '/two-factor-login-validate',
                methodType: 'post',
                handler: async function (req, res) {
                    try {
                        let response = await twoFactorLoginValidate({
                            userModel: req.models['User'],
                            data: req.body
                        });
                        res.json({
                            success: true,
                            message: "Activate account",
                            result: response
                        });
                    } catch (e) {
                        res.json({
                            success: false,
                            message: e.message,
                            result: {}
                        })
                    }
                }
            },
            {
                path: '/login-with-access-token',
                methodType: 'post',
                handler: async function (req, res) {
                    try {
                        let response = await loginWithAccessToken({
                            userModel: req.models['User'],
                            data: req.body
                        });
                        res.json({
                            success: true,
                            message: "Activate account",
                            result: response
                        });
                    } catch (e) {
                        res.json({
                            success: false,
                            message: e.message,
                            result: {}
                        })
                    }
                }
            },
            {
                path: "/activate-account",
                methodType: "post",
                handler: async function (req, res) {
                    try {
                        let response = await activateAccount({
                            userModel: req.models['User'],
                            emailTemplates: req.emailTemplates,
                            sendEmail: req.sendEmail,
                            data: req.body
                        });
                        res.json({
                            success: true,
                            message: "Activate account",
                            result: response
                        });
                    } catch (e) {
                        res.json({
                            success: false,
                            message: e.message,
                            result: {}
                        });
                    }
                }
            },
            {
                path: "/refresh-token",
                methodType: "post",
                handler: async function (req, res) {
                    try {
                        let response = await refreshTokenHandler({
                            userModel: req.models['User'], 
                            data: req.body
                        });
                        res.json({
                            success: true,
                            message: "Refresh token",
                            result: response
                        });
                    } catch (e) {
                        res.json({
                            success: false,
                            message: e.message,
                            result: {}
                        });
                    }
                }
            },
            {
                path: "/login",
                methodType: "post",
                handler: async function (req, res) {
                    try {
                        let response = await login({userModel: req.models['User'], data: req.body});
                        res.json({
                            success: true,
                            message: "You are logged in",
                            result: response
                        });
                    } catch (e) {
                        res.json({
                            success: false,
                            message: e.message,
                            result: {}
                        });
                    }
                }
            },
            {
                path: "/signup",
                methodType: "post",
                handler: async function (req, res) {
                    try {
                        let response = await signup({
                            userModel: req.models['User'], 
                            emailTemplates: req.emailTemplates,
                            sendEmail: req.sendEmail,
                            data: req.body
                        });
                        res.json({
                            success: true,
                            message: "Welcome to app",
                            result: response
                        });
                    } catch (e) {
                        res.json({
                            success: false,
                            message: e.message,
                            result: {}
                        });
                    }
                }
            }
        ]
    },
}