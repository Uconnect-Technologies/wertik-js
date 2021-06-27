import wertik from "./index";
import { useDatabase } from "./database";
import { useModule } from "./modules/modules";

(async () => {
  wertik({
    port: 1200,
    database: {
      wapgee: await useDatabase({
        port: 1200,
        password: "pass",
        username: "root",
        host: "localhost",
        name: "wapgee",
      }),
      jscontainer: await useDatabase({
        port: 1200,
        password: "pass",
        username: "root",
        host: "localhost",
        name: "jscontainer",
      }),
    },
    modules: {
      users: useModule({
        database: "wapgee",
        table: "users",
      }),
    },
  });
})();
