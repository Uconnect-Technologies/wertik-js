import { useDatabase } from "./database";
import { useGraphql } from "./graphql";
import wertik from "./index";
import { useMailer, useModule, useWebSockets } from "./index";

(async () => {
  wertik({
    port: 1200,
    graphql: useGraphql({
      applyMiddlewareOptions: {
        path: "/graphl123",
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
