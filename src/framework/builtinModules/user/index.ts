export default {
  name: "User",
  graphql: {
    crud: {
      query: {
        generate: true,
        operations: "*",
      },
      mutation: {
        generate: true,
        operations: "*",
      },
    },
    schema: `
      type User {
        _id: String
        id: Int
        name: String
        username: String
        refresh_token: String
        access_token: String
        is_activated: Boolean
        activated_on: String
        two_factor_code: String
        is_super_user: Boolean
        activation_token: String
        email: String
        gender: String
        referer: String
        created_at: String
        updated_at: String
        user_roles: RoleList
        user_permissions: RolePermissionList
      }
      input UserInput {
        _id: String
        id: Int
        name: String
        username: String
        refresh_token: String
        access_token: String
        is_activated: Boolean
        activated_on: String
        two_factor_code: String
        is_super_user: Boolean
        activation_token: String
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
      resolvers: {},
    },
    query: {
      schema: ``,
      resolvers: {},
    },
  },
  restApi: {},
  database: {
    relationships: {
      UserRole: {
        type: "hasMany",
        graphqlName: "user_roles",
        foreignKey: "user_id",
      },
      UserPermission: {
        type: "hasMany",
        foreignKey: "user_id",
        graphqlName: "user_permissions",
      },
    },
    sql: {
      tableName: "user",
      fields: {
        name: {
          type: "STRING",
        },
        username: {
          type: "String",
        },
        refresh_token: {
          type: "String",
        },
        access_token: {
          type: "String",
        },
        is_activated: {
          type: "BOOLEAN",
        },
        activated_on: {
          type: "String",
        },
        two_factor_code: {
          type: "String",
        },
        is_super_user: {
          type: "BOOLEAN",
        },
        activation_token: {
          type: "String",
        },
        email: {
          type: "String",
        },
        password: {
          type: "String",
        },
        gender: {
          type: "String",
        },
        referer: {
          type: "String",
        },
        is_deleted: {
          type: "INTEGER",
        },
      },
    },
    mongodb: {
      tableName: "user",
      schema: {
        name: String,
        username: String,
        refresh_token: String,
        access_token: String,
        is_activated: Boolean,
        activated_on: String,
        two_factor_code: String,
        is_super_user: Boolean,
        activation_token: String,
        email: String,
        password: String,
        gender: String,
        referer: String,
      },
    },
  },
};
