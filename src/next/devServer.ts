import wertik, {
  useMailer,
  useGraphql,
  useDatabase,
  useCronJob,
  useSocketIO,
  useModule,
  WertikBackupModule,
  useIndependentWebSocketsServer,
  useWebSockets,
} from "./index";

(async () => {
  wertik({
    port: 1200,
    graphql: useGraphql({
      applyMiddlewareOptions: {
        path: "/graphql",
      },
    }),
    database: {
      jscontainer: useDatabase({
        name: "jscontainer",
        password: "pass",
        host: "localhost",
        port: 3306,
        username: "root",
      }),
    },
    sockets: {
      mySockets: useWebSockets({
        path: "/websockets",
      }),
      mySockets2: useIndependentWebSocketsServer({
        port: 1500,
      }),
      socketio: useSocketIO({
        path: "/mysocketioserver",
      }),
    },
    storage: {},
    cronJobs: {
      aCronJobName: useCronJob({
        name: "Send emails to people every 1 minute",
        handler: () => console.log(new Date().toLocaleDateString()),
        expression: "*/10 * * * * *",
      }),
    },
    mailer: {
      mail: useMailer(),
    },
    modules: {
      games: useModule({
        useDatabase: true,
        name: "Games",
        table: "games",
        database: "jscontainer",
        events: {
          beforeCreate() {
            console.log("This will run before creating a game");
          },
        },
        on({ useExpress, useQuery, useMutation, useSchema }) {
          useExpress((express) => {
            express.get("/404", (req, res) => res.status(404).send("404"));
          });
          useQuery({
            name: "getGames",
            query: "getGames: [Games]",
            resolver() {
              return [];
            },
          });
          useMutation({
            name: "updateAllGames",
            query: "updateAllGames: [Games]",
            resolver() {
              return [];
            },
          });
          useSchema(`
            type MyType {
              id: Int
              name: String
            }
          `);
        },
      }),
      backup: WertikBackupModule("jscontainer", "Backup"),
      containers: useModule({
        table: "containers",
        database: "jscontainer",
        name: "containers",
        useDatabase: true,
      }),
    },
  });
})();
