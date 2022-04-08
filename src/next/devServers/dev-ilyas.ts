import { useMysqlDatabase } from "../database"
import { useGraphql } from "../graphql"
import wertik, { useModule } from "../index"
import { useMailer } from "../mailer"

const devIlyas = async () => {
  // wertik({
  //   appEnv: "development",
  //   port: 1200,
  //   graphql: useGraphql(),
  //   mailer: {
  //     instances: {
  //       default: useMailer({
  //         name: "default",
  //       }),
  //     },
  //     events: {
  //       onEmailSent: (props) => {},
  //       onEmailSentFailed: () => {},
  //     },
  //   },
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
  //     shirt_sales: useModule({
  //       name: "shirt_sales",
  //       useDatabase: true,
  //       database: "default",
  //       table: "shirt_sales",
  //       on: ({ hasOne }) => {
  //         hasOne({
  //           module: "shirts",
  //           graphqlKey: "shirt",
  //           database: "default",
  //           options: {
  //             foreignKey: "id",
  //             sourceKey: "shirt_id",
  //             targetKey: "shirt_id",
  //           },
  //         })
  //       },
  //     }),
  //   },
  // })
  wertik({
    port: 1200,
  });
}

export default devIlyas
