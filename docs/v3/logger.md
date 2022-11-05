# Logger

Wertik JS allows using logger for logging purpose. Wertik JS uses `winston` for logging purpose. We choose `winston` because of its popularity. To setup logger, you need to import `useLogger`and `useWinstonTransport` from wertik.

```javascript
import wertik, { useLogger, useWinstonTransport } from "wertik-js/lib/"
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
  })
}
```

- `useLogger` creates a new winston instance and
- `useWinstonTransport` returns transports, it expects a function where wertik js passed winston so that you can return your transports.

Let's log an info:

```javascript
import wertik, {
  useModule,
  useLogger,
  useWinstonTransport,
} from "wertik-js/lib/"

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
        on: function ({ useExpress }) {
          useExpress((exp) => {
            exp.get("/check", (req: any, res: any) => {
              req.wertik.logger.info({ name: "ilyas" })
              res.send("w")
            })
          })
        },
      }),
    },
  })
}
```

Now go to `http://localhost:1200/check` and you should see something like this in console:

```log
[DevServer] [Logger] Initialized winston logger
[DevServer] [Module] Initialized module "custom"
[DevServer] Wertik JS app listening at http://localhost:1200
[DevServer] {"level":"info","message":{"name":"ilyas"}}
```

And go to your file `info.log`, you will find something like this in your file content:

```json
{ "level": "info", "message": { "name": "ilyas" } }
```
