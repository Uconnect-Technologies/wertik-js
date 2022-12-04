import wertik, { useMysqlDatabase, useGraphql, useModule } from "./index"

wertik({
  port: 1200,
  graphql: useGraphql(),
  database: {
    wapgee: useMysqlDatabase({
      port: 3306,
      name: "wapgee",
      host: "localhost",
      password: "pass",
      username: "root",
    }),
    test: useMysqlDatabase({
      username: "root",
      port: 3306,
      password: "pass",
      host: "localhost",
      name: "wertik",
    }),
  },
  modules: {
    User: useModule({
      name: "User",
      useDatabase: true,
      table: "users",
      database: "wapgee",
    }),
    test: useModule({
      name: "Shirts",
      useDatabase: true,
      database: "test",
      table: "shirts",
    }),
  },
})
