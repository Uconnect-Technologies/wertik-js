import { useDatabase } from "./database";
import { useGraphql } from "./graphql";
import wertik, { useModule, useWebSockets } from "./index";
import { useIndependentWebSocketsServer, useSocketIO } from "./sockets";

(async () => {
  wertik({
    port: 1200,
    graphql: useGraphql(),
    cronJobs: {},
    email: {},
    storage: {},
    sockets: {},
    database: {},
    modules: {},
  });
})();
