import wertik, {useModule} from "../index"
import { useLogger, useWinstonTransport } from "../logger"

const devIlyas = async () => {
  wertik({
    port: 1200,
    logger: useLogger({
      transports: useWinstonTransport((winston) => {
        return [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: "info.log",
            level: "info",
          }),
        ]
      }),
    }),
    modules: {
      custom: useModule({
        name: "custom",
        useDatabase: false,
        on: function ({useExpress}) {
          useExpress((exp) => {
            exp.get("/check" , (req: any, res: any) => {
              req.wertik.logger.info({name: "ilyas"});
              res.send("w")
            })
          })
        }
      })
    }
  })
}

export default devIlyas
