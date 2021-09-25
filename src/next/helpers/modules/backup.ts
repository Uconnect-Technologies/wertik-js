import moment from "moment";
import { useModule } from "../../modules/modules";
import mysqldump from "mysqldump";

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
    backupInstance,
  };
};
const uploadDumpToDigitalOceanSpaces = () => {};
const uploadDumpToDropbox = () => {};

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
      query: "backupDigitalOceanSpaces: BackupSuccessResponse",
      resolver() {
        console.log(1);
      },
    });
    useMutation({
      name: "backupDropbox",
      query: "backupDropbox: BackupSuccessResponse",
      resolver() {
        console.log(1);
      },
    });
    useMutation({
      name: "removeLocalBackups",
      query: "removeLocalBackups: String",
      resolver() {
        console.log(1);
      },
    });
    // useMutation({
    //   name: "one",
    //   query: "one: String",
    //   resolver: () => {
    //     return "wow";
    //   },
    // });
  },
});
