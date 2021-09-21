import { useModule } from "../../modules/modules";

const dumpDatabase = () => {};
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
      query: "backupLocal(database: [String]): BackupSuccessResponse",
      resolver(_, args, context) {
        // const { database } = args;
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
