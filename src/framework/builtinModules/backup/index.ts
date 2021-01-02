import {
  dumpDatabase,
  dumpDatabaseToDigitalOcean,
  dumpDatabaseToDropbox,
  loadAllLocalBackups,
} from "./helpers";
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
      type BackupSuccessResponse {
        message: String
        filename: String
        backup: Backup
      }
    `,
    mutation: {
      schema: `
        backupLocal: BackupSuccessResponse
        backupDigitalOceanSpaces: BackupSuccessResponse
        backupDropbox: BackupSuccessResponse
      `,
      resolvers: {
        // fixme: continue progress
        backupLocal: async (_, args, context, info) => {
          let op = await dumpDatabase({
            database: context.wertik.configuration.database,
            models: context.wertik.models,
          });
          return {
            message: "Backup to Local Drive has been completed.",
            filename: op.filename,
            backup: op.backupInstance,
          };
        },
        backupDigitalOceanSpaces: async (_, args, context, info) => {
          let op = await dumpDatabase({
            database: context.wertik.configuration.database,
            models: context.wertik.models,
          });

          let opDigitalOcean = await dumpDatabaseToDigitalOcean({
            localDump: op,
            configuration: context.wertik.configuration,
          });

          return {
            message:
              "Backup to DigitalOcean and Local Drive has been completed.",
            filename: opDigitalOcean.filename,
            backup: opDigitalOcean.backupInstance,
          };
        },
        backupDropbox: async (_, args, context, info) => {
          let op = await dumpDatabase({
            database: context.wertik.configuration.database,
            models: context.wertik.models,
          });
          let opDropbox = await dumpDatabaseToDropbox({
            localDump: op,
            configuration: context.wertik.configuration,
          });
          return {
            message: "Backup to Dropbox has been completed.",
            filename: opDropbox.filename,
            backup: opDropbox.backupInstance,
          };
        },
      },
    },
    query: {
      schema: `
        localBackupsList: [String]
      `,
      resolvers: {
        localBackupsList: async () => {
          const list = await loadAllLocalBackups();
          return list;
        },
      },
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
