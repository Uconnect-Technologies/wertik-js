require("dotenv").config()

const {
  default: wertik,
  useLogger,
  useWinstonTransport,
  useIndependentWebSocketsServer,
  useSocketIO,
  useWebSockets,
  useMailer,
  useGraphql,
} = require("./../lib/index")

test("Expect no configuration can start the server", async () => {
  await expect(wertik()).resolves.not.toThrowError()
})

test("Expect empty configuration object an start the server", async () => {
  await expect(wertik()).resolves.not.toThrowError()
})

test("Expect null configuration does not causes error", async () => {
  await expect(wertik(null)).resolves.not.toThrowError()
})

test("Expect mailer to work without configuration and does not causes error", async () => {
  await expect(
    wertik({
      mailer: {
        default: useMailer({
          name: "Default",
        }),
      },
    })
  ).resolves.not.toThrowError()
})

test("Expect graphql to work with useGraphql and does not causes error", async () => {
  await expect(
    wertik({
      graphql: useGraphql(),
    })
  ).resolves.not.toThrowError()
})

test("Expect useWebSockets, useIndependentWebSocketsServer and useSocketIO works and does not throw any error", async () => {
  await expect(
    wertik({
      sockets: {
        mySockets: useWebSockets({
          path: "/websockets",
        }),
        socketio: useSocketIO({
          path: "/mysocketioserver",
        }),
        mySockets2: useIndependentWebSocketsServer({
          port: 1500,
        }),
      },
    }).then((app) => {
      app.sockets.mySockets2.close()
    })
  ).resolves.not.toThrowError()
})

test("Expect logger to run without throwing any error", async () => {
  await expect(
    wertik({
      logger: useLogger({
        transports: useWinstonTransport((winston) => {
          return [
            new winston.transports.File({
              filename: "info.log",
              level: "info",
            }),
          ]
        }),
      }),
    })
  ).resolves.not.toThrowError()
})
