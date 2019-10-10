export default {
  name: "RolePermission",
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
          type RolePermission {
              id: Int
              name: String
              role: Role
              permission: Permission
              
              created_at: String
              updated_at: String
          }
          input RolePermissionInput {
              id: Int
              name: String
              role: Int
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
          role: {
              type: "INTEGER"
          },
          permission: {
              type: "INTEGER"
          },
      }
  }
}