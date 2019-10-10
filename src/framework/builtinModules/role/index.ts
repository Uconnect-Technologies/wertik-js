export default {
    name: "Role",
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
            type Role {
                id: Int
                name: String
                created_at: String
                updated_at: String
            }
            input RoleInput {
                id: Int
                name: String
            }
        `,
        mutation: {
            schema: ``,
            resolvers: {
            }
        },
        query: {
            schema: ``,
            resolvers: {}
        }
    },
    restApi: {
        
    },
    fields: {
        sql: {
            name: {
                type: "STRING"
            },
        }
    }
}