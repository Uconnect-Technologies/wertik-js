let bcrypt = require("bcrypt-nodejs");
import moment from "moment";
import statusCodes from "./../../../framework/helpers/statusCodes";
import createJwtToken from "./../../../framework/security/createJwtToken";
import {ApolloError} from "apollo-server";
import {get} from "lodash";

import {login, signup, loginWithAccessToken , activateAccount,refreshTokenHandler} from "./handlers/index"

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
            input loginInput {
                email: String!
                password: String!
            }
        `,
        mutation: {
            schema: `
                twoFactorLogin(input: EmailInput): User
                twoFactorLoginValidate(input: UserInput): User
                loginWithAccessToken(input: AccessTokenInput): User
                activateAccount(input: ActivationTokenInput): User
                signup(input: SignupInput): User
                login(input: loginInput): User
                refreshToken(input: RefreshTokenInput): User
            `,
            resolvers: {
                twoFactorLogin:  async (_:any, args:any, context:any,info: any) => {

                },
                twoFactorLoginValidate:  async (_:any, args:any, context:any,info: any) => {

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
        
    },
}