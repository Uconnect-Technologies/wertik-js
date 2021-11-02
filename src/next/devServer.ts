import { useDatabase } from "./database";
import { useGraphql } from "./graphql";
import wertik, { useModule } from "./index";

(async () => {
  wertik({
    port: 1200,
    skip: false,
    graphql: useGraphql(),
    cronJobs: {},
    email: {},
    storage: {},
    sockets: {},
    database: {
      default: await useDatabase({
        password: "pass",
        username: "root",
        name: "jscontainer",
      }),
    },
    modules: {
      Users: useModule({
        useDatabase: true,
        table: "users",
        database: "default",
        name: "Users",
      }),
    },
  });
})();
