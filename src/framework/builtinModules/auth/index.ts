export default {
    name: "Auth",
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
            input AuthInput {
                email: String!
                password: String!
            }
        `,
        mutation: {
            schema: `
                twoFactorLogin(input: UserInput): User
                twoFactorLoginValidate(input: UserInput): User
                loginWithAccessToken(input: UserInput): User
                activateAccount(input: UserInput): User
                signup(input: UserSignupInput): User
                login(input: UserInput): User
                refreshToken(input: UserInput): User
            `,
            resolvers: {
                twoFactorLogin: () => {},
                twoFactorLoginValidate: () => {},
                loginWithAccessToken: () => {},
                activateAccount: () => {},
                signup: () => {},
                login: () => {},
                refreshToken: () => {}
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