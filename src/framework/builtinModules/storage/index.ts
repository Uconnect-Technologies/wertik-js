export default {
  name: "Storage",
  graphql: {
    schema: `
      type Storage {
        id: Int
        name: String
        filename: String
        size: String
        type: String
        folder: String
        created_by: User
        created_by_id: Int
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
      resolvers: {},
    },
    query: {
      schema: ``,
      resolvers: {},
    },
  },

  restApi: {
    endpoints: [
      {
        path: "/upload",
        methodType: "post",
        handler: async function (req, res, restApiSuccessResponse, restApiErrorResponse) {
          const upload = req.multerInstance.single("file");
          upload(req, res, async function (err) {
            if (err) {
              restApiErrorResponse({
                err: err,
                res: res,
                data: {},
              });
              return;
            }
            let object = {
              filename: req.file.filename,
              ...req.body,
              size: req.file.size,
              type: req.file.mimetype,
            };
            let response = await req.wertik.models.Storage.create(object);
            response = response.instance;
            restApiSuccessResponse({
              res: res,
              data: {
                storageInstance: response,
                info: {
                  sizeUploaded: `${new String(req.file.size / 1024 / 1024)}`.substring(0, 6) + `MB`,
                  disk: "default",
                },
                directory: req.file.path,
              },
              message: `File successfully uploaded`,
            });
          });
        },
      },
    ],
  },
  database: {
    selectIgnoreFields: ["created_by"],
    relationships: {
      oneToOne: {
        User: {
          relationColumn: "created_by_id",
          graphqlName: "created_by",
          foreignKey: "id",
        },
      },
    },
    sql: {
      tableName: "storage",
      fields: {
        name: {
          type: "STRING",
        },
        filename: {
          type: "STRING",
          unique: true,
        },
        size: {
          type: "STRING",
        },
        folder: {
          type: "STRING",
        },
        type: {
          type: "STRING",
        },
        is_deleted: {
          type: "INTEGER",
        },
        created_by_id: {
          type: "INTEGER",
        },
      },
    },
  },
};