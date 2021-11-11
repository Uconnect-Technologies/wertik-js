import { useDatabase } from "./database";
import { useGraphql } from "./graphql";
import wertik, { useModule, useWebSockets } from "./index";
import { useMailer } from "./mailer";
import { useIndependentWebSocketsServer, useSocketIO } from "./sockets";

(async () => {
  wertik({
    port: 1200,
    database: {
      jscontainer: useDatabase({
        name: "jscontainer",
        password: "pass",
        host: "localhost",
        port: 3306,
        username: "root",
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
    // graphql: useGraphql(),
    // cronJobs: {},
    // email: {},
    // storage: {},
    // sockets: {},
    // database: {},
    // modules: {},
  });
})();
