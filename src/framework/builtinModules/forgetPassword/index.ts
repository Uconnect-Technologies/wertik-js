export default {
    name: "ForgetPassword",
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
            type ForgetPassword {
                id: Int
                name: String
                email: String
                token: String
            }
            input ForgetPasswordInput {
                id: Int
                name: String
                email: String
                token: String
            }
        `,
        mutation: {
            schema: `
                requestPasswordReset(input: ForgetPasswordInput): ForgetPassword
                resetPassword(input: ForgetPasswordInput): ForgetPassword
            `,
            resolvers: {
                requestPasswordReset: () => {},
                resetPassword: () => {}
            }
        },
        query: {
            schema: ``,
            resolvers: {}
        }
    },
    restApi: {
        
    },
}