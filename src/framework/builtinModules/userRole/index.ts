export default {
  name: "UserRole",
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
          type UserRole {
              id: Int
              name: String
              user: User
              role: Role
              
              created_at: String
              updated_at: String
          }
          input UserRoleInput {
              id: Int
              name: String
              user: Int
              role: Int
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
  database: {
    sql: {
        fields: {
            name: {
                type: "STRING"
            },
            user: {
                type: "INTEGER"
            },
            role: {
                type: "INTEGER"
            },  
        }
    }
  }
}