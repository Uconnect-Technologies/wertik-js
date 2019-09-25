export default {
    name: "User",
    graphql: {
        crud: {
            query: {
                generate: true,
                operations: "*"
            },
            mutation: {
                generate: true,
                operations: "*"
            }
        },
        schema: `
            type User {
                id: Int
                name: String
                age: Int
                username: String
                refreshToken: String
                accessToken: String
                isActivated: Boolean
                activatedOn: String
                twoFactorCode: String
                isSuperUser: Boolean
                activationToken: String
                email: String
                password: String
                gender: String
                referer: String
            }
            input UserInput {
                id: Int
                name: String
                age: Int
                username: String
                refreshToken: String
                accessToken: String
                isActivated: Boolean
                activatedOn: String
                twoFactorCode: String
                isSuperUser: Boolean
                activationToken: String
                email: String
                password: String
                gender: String
                referer: String
            }
            input UserSignupInput {
                email: String
                password: String
                confirmPassword: String
            }
        `,
        mutation: {
            schema: ``,
            resolvers: {
                
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