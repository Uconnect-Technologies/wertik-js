export default {
  name: "UserPermission",
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
          type UserPermission {
              id: Int
              name: String
              user: User
              permission: Permission
              
              created_at: String
              updated_at: String
          }
          input UserPermissionInput {
              id: Int
              name: String
              user: Int
              permission: Int
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
  fields: {
      sql: {
          name: {
              type: "STRING"
          },
          user: {
              type: "INTEGER"
          },
          permission: {
              type: "INTEGER"
          },
      }
  }
}