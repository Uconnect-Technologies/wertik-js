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
        username: String
        refreshToken: String
        accessToken: String
        isActivated: Boolean
        activatedOn: String
        twoFactorCode: String
        isSuperUser: Boolean
        activationToken: String
        email: String
        gender: String
        referer: String
        created_at: String
        updated_at: String
      }
      input UserInput {
        id: Int
        name: String
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
      resolvers: {}
    },
    query: {
      schema: ``,
      resolvers: {}
    }
  },
  restApi: {},
  database: {
    sql: {
      fields: {
        name: {
          type: "STRING"
        },
        username: {
          type: "String"
        },
        refreshToken: {
          type: "String"
        },
        accessToken: {
          type: "String"
        },
        isActivated: {
          type: "BOOLEAN"
        },
        activatedOn: {
          type: "String"
        },
        twoFactorCode: {
          type: "String"
        },
        isSuperUser: {
          type: "BOOLEAN"
        },
        activationToken: {
          type: "String"
        },
        email: {
          type: "String"
        },
        password: {
          type: "String"
        },
        gender: {
          type: "String"
        },
        referer: {
          type: "String"
        },
        isDeleted: {
          type: "INTEGER"
        }
      }
    }
  }
};
