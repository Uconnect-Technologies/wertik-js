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
    database: {},
    modules: {},
  });
})();
