import moment from "moment";
import { useModule } from "../../modules/modules";
import mysqldump from "mysqldump";
import fs from "fs";

const dumpDatabase = async (dbName: string, model: any, credentials: any) => {
  const filename = `backups/${moment().format(
    "MMMM-DD-YYYY-h-mm-ss-a"
  )}-database-${dbName}.sql`.toLowerCase();

  const backupInstance = await model.create({
    uploaded_filename: filename,
    uploaded_to: "local",
  });

  await mysqldump({
    connection: {
      host: credentials.host,
      user: credentials.username,
      password: credentials.password,
      database: credentials.name,
    },
    dumpToFile: filename,
  });

  return {
    filename,
    backup: backupInstance,
  };
};
const uploadDumpToDigitalOceanSpaces = () => {};
const uploadDumpToDropbox = async (filename, dropboxInstance) => {
  const data: Buffer = await fs.readFileSync(filename);
  const response = await dropboxInstance.filesUpload({
    strict_conflict: false,
    path: `/${filename}`,
    contents: data,
  });
  return response;
};

export default useModule({
  name: "Backup",
  useDatabase: true,
  database: "wapgee",
  table: "Backup",
  on: function ({
    useSchema,
    useQuery,
    useMutation,
    useExpress,
    hasOne,
    hasMany,
  }) {
    useSchema(`
      type BackupSuccessResponse {
        message: String
        filename: String
        backup: Backup
      }
    `);
    useMutation({
      name: "backupLocal",
      query: "backupLocal(database: [String]): [BackupSuccessResponse]",
      async resolver(_, args, context) {
        const push = [];
        for (const dbName of args.database) {
          push.push(
            await dumpDatabase(
              dbName,
              context.wertik.database.wapgee.instance.models.Backup,
              context.wertik.database.wapgee.credentials
            )
          );
        }
        return push;
      },
    });
    useMutation({
      name: "backupDigitalOceanSpaces",
      query:
        "backupDigitalOceanSpaces(database: [String]): [BackupSuccessResponse]",
      async resolver(_, args, context) {
        console.log(context.wertik);
      },
    });
    useMutation({
      name: "backupDropbox",
      query:
        "backupDropbox(storage: String!, database: [String]): [BackupSuccessResponse]",
      async resolver(_, args, context) {
        const push = [];
        const storage = context.wertik.storage.dropbox[args.storage];
        if (!storage) {
          throw new Error("No such storage found: " + args.storage);
        }

        for (const dbName of args.database) {
          const dump = await dumpDatabase(
            dbName,
            context.wertik.database.wapgee.instance.models.Backup,
            context.wertik.database.wapgee.credentials
          );
          push.push(dump);
          const uploadToDropbox = await uploadDumpToDropbox(
            dump.filename,
            storage
          );
          await dump.backup.update({
            uploaded_to: "digitalocean",
            uploaded_filename: uploadToDropbox.result.path_lower,
          });
          dump.backup.uploaded_to = "digitalocean";
          dump.backup.uploaded_filename = uploadToDropbox.result.path_lower;
        }

        return push;
      },
    });
    useMutation({
      name: "removeLocalBackups",
      query: "removeLocalBackups: String",
      resolver() {
        console.log(1);
      },
    });
  },
});
