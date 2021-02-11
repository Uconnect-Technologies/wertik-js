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
const index_1 = require("./handlers/index");
exports.default = {
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
                twoFactorLogin: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield index_1.twoFactorLogin({
                        userModel: context.wertik.models["User"],
                        emailTemplates: context.wertik.emailTemplates,
                        sendEmail: context.wertik.sendEmail,
                        data: args.input,
                    });
                }),
                twoFactorLoginValidate: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield index_1.twoFactorLoginValidate({
                        userModel: context.wertik.models["User"],
                        data: args.input,
                    });
                }),
                loginWithAccessToken: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield index_1.loginWithAccessToken({
                        userModel: context.wertik.models["User"],
                        data: args.input,
                    });
                }),
                activateAccount: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield index_1.activateAccount({
                        userModel: context.wertik.models["User"],
                        emailTemplates: context.wertik.emailTemplates,
                        sendEmail: context.wertik.sendEmail,
                        data: args.input,
                    });
                }),
                signup: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield index_1.signup({
                        userModel: context.wertik.models["User"],
                        emailTemplates: context.wertik.emailTemplates,
                        sendEmail: context.wertik.sendEmail,
                        data: args.input,
                        configuration: context.wertik.configuration,
                    });
                }),
                login: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield index_1.login({
                        userModel: context.wertik.models["User"],
                        data: args.input,
                    });
                }),
                refreshToken: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield index_1.refreshTokenHandler({
                        userModel: context.wertik.models["User"],
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
        endpoints: [],
    },
};
//# sourceMappingURL=index.js.map