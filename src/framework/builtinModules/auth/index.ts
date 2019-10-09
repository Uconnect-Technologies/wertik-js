let bcrypt = require("bcrypt-nodejs");
import statusCodes from "./../../../framework/helpers/statusCodes";
import createJwtToken from "./../../../framework/security/createJwtToken";
import {ApolloError} from "apollo-server";
import {get} from "lodash";
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
                    
                },
                activateAccount:  async (_:any, args:any, context:any,info: any) => {

                },
                signup:  async (_:any, args:any, context:any,info: any) => {
                    let { email, password, confirmPassword } = args.input;
                    let user = await context.models['User'].findOne({
                        email: email
                    });
                    if (user) throw new ApolloError("Email is already used");
                    var hash = bcrypt.hashSync(password);
                    let newUser = await context.models['User'].create({
                        email: email,
                        referer: get(args.input, "referer", ""),
                        superUser: false,
                        name: get(args.input, "name", ""),
                        accessToken: await createJwtToken({
                          email: email,
                          for: "authentication"
                        }),
                        refreshToken: await createJwtToken({
                          email: email,
                          for: "refreshToken"
                        }),
                        isActivated: false,
                        isSuperUser: get(args.input, "isSuperUser", false),
                        activationToken:
                          Math.random()
                            .toString(36)
                            .substring(2) +
                          Math.random()
                            .toString(36)
                            .substring(2) +
                          Math.random()
                            .toString(36)
                            .substring(2),
                        password: hash
                      });
                    return newUser;
                },
                login:  async (_:any, args:any, context:any,info: any) => {
                    let { email, password } = args.input;
                    let user = await context.models['User'].findOne({ email: email });
                    if (!user) {
                        throw new ApolloError("No User found with such email");
                    }
                    let comparePassword = bcrypt.compareSync(password, user.password);
                    if (!comparePassword) {
                        throw new ApolloError("Incorrect Password");
                    }
                    let token = await createJwtToken({
                        email: email,
                        for: "authentication"
                    });
                    await user.update({
                        accessToken: token
                    });
                    return user;
                },
                refreshToken:  async (_:any, args:any, context:any,info: any) => {
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