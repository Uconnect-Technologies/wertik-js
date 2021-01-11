import {
  login,
  signup,
  loginWithAccessToken,
  activateAccount,
  refreshTokenHandler,
  twoFactorLogin,
  twoFactorLoginValidate
} from "./handlers/index";

export default {
  name: "Auth",
  useDatabase: false,
  graphql: {
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
      type AuthResponse {
        message: String
        returning: User
      }
    `,
    mutation: {
      schema: `
        twoFactorLogin(input: EmailInput): SuccessResponse
        twoFactorLoginValidate(input: TwoFactorCodeInput): User
        loginWithAccessToken(input: AccessTokenInput): User
        activateAccount(input: ActivationTokenInput): SuccessResponse
        signup(input: SignupInput): AuthResponse
        login(input: loginInput): AuthResponse
        refreshToken(input: RefreshTokenInput): User
      `,
      resolvers: {
        twoFactorLogin: async (_: any, args: any, context: any, info: any) => {
          return await twoFactorLogin({
            userModel: context.wertik.models["User"],
            emailTemplates: context.wertik.emailTemplates,
            sendEmail: context.wertik.sendEmail,
            data: args.input,
          });
        },
        twoFactorLoginValidate: async (
          _: any,
          args: any,
          context: any,
          info: any
        ) => {
          return await twoFactorLoginValidate({
            userModel: context.wertik.models["User"],
            data: args.input,
          });
        },
        loginWithAccessToken: async (
          _: any,
          args: any,
          context: any,
          info: any
        ) => {
          return await loginWithAccessToken({
            userModel: context.wertik.models["User"],
            data: args.input,
          });
        },
        activateAccount: async (_: any, args: any, context: any, info: any) => {
          return await activateAccount({
            userModel: context.wertik.models["User"],
            emailTemplates: context.wertik.emailTemplates,
            sendEmail: context.wertik.sendEmail,
            data: args.input,
          });
        },
        signup: async (_: any, args: any, context: any, info: any) => {
          return await signup({
            userModel: context.wertik.models["User"],
            emailTemplates: context.wertik.emailTemplates,
            sendEmail: context.wertik.sendEmail,
            data: args.input,
            configuration: context.wertik.configuration,
          });
        },
        login: async (_: any, args: any, context: any, info: any) => {
          return await login({
            userModel: context.wertik.models["User"],
            data: args.input,
          });
        },
        refreshToken: async (_: any, args: any, context: any, info: any) => {
          return await refreshTokenHandler({
            userModel: context.wertik.models["User"],
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
    endpoints: [],
  },
};
