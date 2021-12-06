import { usePostgresDatabase } from "./database";
import wertik, {
  useMailer,
  useGraphql,
  useDatabase,
  useCronJob,
  useSocketIO,
  useMysqlDatabase,
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
      wertik: usePostgresDatabase({
        host: "127.0.0.1",
        port: 5432,
        name: "postgres",
        password: "asdf",
        username: "postgres",
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
    modules: {},
  });
})();
