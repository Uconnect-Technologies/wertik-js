import wertik from "./index";
import { useDatabase } from "./database";
import { useModule } from "./modules/modules";

(async () => {
  wertik({
    port: 1200,
    graphql: {},
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
        name: "User",
        useDatabase: true,
        database: "wapgee",
        table: "users",
        on: function ({ useQuery, useMutation, useExpress, hasOne }) {},
      }),
      post: useModule({
        name: "Post",
        useDatabase: true,
        database: "wapgee",
        table: "post",
        on: function ({ useQuery, useMutation, useExpress, hasOne }) {
          hasOne({
            graphqlKey: "user",
            database: "wapgee",
            module: "User",
          });
        },
      }),
    },
  });
})();
