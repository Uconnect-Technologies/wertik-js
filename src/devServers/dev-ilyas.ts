import wertik, { useModule, useMysqlDatabase, useGraphql } from '../index'
import { useLogger, useWinstonTransport } from '../logger'

const devIlyas = () => {
  wertik({
    port: 1200,
    graphql: useGraphql(),
    database: {
      wapgee: useMysqlDatabase({
        name: 'wapgee',
        host: 'localhost',
        password: 'pass',
        username: 'root',
        port: 3306,
      }),
    },
    modules: {
      User: useModule({
        useDatabase: true,
        name: 'User',
        table: 'users',
        database: 'wapgee',
      }),
    },
    logger: useLogger({
      transports: useWinstonTransport((winston) => {
        return [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: 'info.log',
            level: 'info',
          }),
        ]
      }),
    }),
  })
}

export default devIlyas
