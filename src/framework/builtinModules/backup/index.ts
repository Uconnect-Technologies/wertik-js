

export default {
  name: "Backup",
  graphql: {
    schema: `
      type Backup {
        id: Int
        name: String
        uploaded_to: String
        uploaded_filename: String
        created_at: String
        updated_at: String
      }
      input BackupInput {
        id: Int
        name: String
        uploaded_to: String
        uploaded_filename: String
      }
    `,
    mutation: {
      schema: `
        backupLocal: String
        backupDigitalOceanSpaces: String
        backupDropbox: String
      `,
      resolvers: {
        // fixme: continue progress
        backupLocal: async (_, args, context, info) => {
          console.log(context.wertik.configuration);
          return "backup done";
        },
        backupDigitalOceanSpaces: async (_, args, context, info) => {
          console.log(context.wertik.configuration);
          return "backup done";
        },
        backupDropbox: async (_, args, context, info) => {
          console.log(context.wertik.configuration);
          return "backup done";
        },
      },
    },
    query: {
      schema: ``,
      resolvers: {},
    },
  },
  restApi: {},
  database: {
    selectIgnoreFields: [],
    relationships: {},
    sql: {
      tableName: "Backup",
      fields: {
        name: {
          type: "STRING",
          unique: true,
        },
        uploaded_to: {
          type: "STRING",
        },
        uploaded_filename: {
          type: "STRING",
        },
      },
    },
  },
};
