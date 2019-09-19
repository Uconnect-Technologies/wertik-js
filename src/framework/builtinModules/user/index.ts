export default {
    name: "User",
    graphql: {
        crud: {generate: true, operations: ["*"]},
        schema: `
            type User {
                _id: String
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
        `,
        mutations: {
            schema: ``,
            resolvers: {}
        },
        queries: {
            schema: ``,
            resolvers: {}
        }
    },
    restApi: {

    },
}