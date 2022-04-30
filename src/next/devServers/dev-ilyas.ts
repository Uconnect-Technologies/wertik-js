import { useMysqlDatabase } from "../database"
import { useGraphql } from "../graphql"
import wertik, { useModule } from "../index"

const devIlyas = async () => {
  wertik(null)
  // wertik({
  //   port: 1200,
  //   graphql: useGraphql(),
  //   database: {
  //     default: useMysqlDatabase({
  //       port: 3306,
  //       username: "root",
  //       password: "pass",
  //       name: "wertik",
  //       host: "localhost",
  //     }),
  //   },
  //   modules: {
  //     forgetPassword: useModule({
  //       name: "forgetPassword",
  //       useDatabase: true,
  //       database: "default",
  //       table: "forgetPassword",
  //     }),
  //     shirts: useModule({
  //       name: "shirts",
  //       useDatabase: true,
  //       database: "default",
  //       table: "shirts",
  //     }),
  //   },
  // })
}

export default devIlyas
