export default {
  name: "Storage",
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
      type Storage {
        id: Int
        name: String
        filename: String
        size: String
        type: String
        folder: String
        createdBy: User
        deleted: Boolean
        created_at: String
        updated_at: String
      }
      input StorageInput {
        id: Int
        name: String
        filename: String
        size: String
        type: String
        folder: String
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
  restApi: {
    endpoints: [
      {
        path: "/upload",
        methodType: "post",
        handler: async function(req, res, restApiSuccessResponse, restApiErrorResponse) {
          console.log(req.files);
        }
      },
      {
        path: "/delete",
        methodType: "post",
        handler: async function(req, res) {}
      }
    ]
  },
  database: {
    sql: {
      fields: {
        name: {
          type: "STRING"
        },
        filename: {
          type: "STRING"
        },
        size: {
          type: "STRING"
        },
        folder: {
          type: "STRING"
        },
        type: {
          type: "STRING"
        },
        isDeleted: {
          type: "INTEGER"
        },
        createdBy: {
          type: "INTEGER"
        }
      }
    }
  }
};
