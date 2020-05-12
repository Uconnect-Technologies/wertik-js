const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export default {
  name: "Storage",
  graphql: {
    crud: {
      query: {
        generate: true,
        operations: "*",
      },
      mutation: {
        generate: false,
        operations: "*",
      },
    },
    schema: `
      type Storage {
        _id: String
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
            let response = await req.models.Storage.create(object);
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
    sql: {
      tableName: "storage",
      fields: {
        name: {
          type: "STRING",
        },
        filename: {
          type: "STRING",
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
    mongodb: {
      tableName: "storage",
      schema: {
        name: String,
        filename: String,
        size: String,
        type: String,
        folder: String,
        created_by: { type: Schema.Types.ObjectId, ref: "user" },
        created_by_id: Number,
        deleted: Boolean,
        created_at: String,
        updated_at: String,
      },
    },
  },
};
