import { useCronJob } from "./cronJobs";
import { useDatabase } from "./database";
import { useGraphql } from "./graphql";
import wertik from "./index";
import { useModule, useWebSockets } from "./index";
import { useMailer } from "./mailer";
import { useIndependentWebSocketsServer, useSocketIO } from "./sockets";
import { useStorage } from "./storage";

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
    storage: {
      dropbox: useStorage({
        for: "dropbox",
        dropboxOptions: {
          accessToken: "asda",
        },
      }),
    },
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
      containers: useModule({
        table: "containers",
        database: "jscontainer",
        name: "containers",
        useDatabase: true,
      }),
    },
  });
})();
