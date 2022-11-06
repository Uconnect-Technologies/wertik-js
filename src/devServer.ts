import wertik, { useMysqlDatabase, useModule, useGraphql } from "./index"

wertik({
  port: 1200,
  graphql: useGraphql(),
  database: {
    wertik: useMysqlDatabase({
      port: 3306,
      name: "wertik",
      password: "pass",
      username: "root",
      host: "localhost",
    }),
  },
  modules: {
    Shirts: useModule({
      table: "shirts",
      name: "Shirts",
      useDatabase: true,
      database: "wertik",
    }),
  },
})
