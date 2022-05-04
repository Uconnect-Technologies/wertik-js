require("dotenv").config()

const {
  default: wertik,
  useModule,
  useMysqlDatabase,
  useIndependentWebSocketsServer,
  useSocketIO,
  useWebSockets,
  useMailer,
  useGraphql,
} = require("./../lib/next/index")

const database = {
  name: process.env.TEST_DATABASE_NAME,
  host: process.env.TEST_DATABASE_HOST,
  password: process.env.TEST_DATABASE_PASSWORD,
  port: process.env.TEST_DATABASE_PORT,
  username: process.env.TEST_DATABASE_USERNAME,
}

test("Expect no configuration can start the server", async () => {
  await expect((app = wertik())).resolves.not.toThrowError()
})

test("Expect empty configuration object an start the server", async () => {
  await expect(wertik()).resolves.not.toThrowError()
})

test("Expect null configuration does not causes error", async () => {
  await expect(wertik(null)).resolves.not.toThrowError()
})

test("Expect test database to connect and does not causes error", async () => {
  await expect(
    wertik({
      database: {
        default: useMysqlDatabase(database),
      },
    })
  ).resolves.not.toThrowError()
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

test("Expect useMysqlDatabase, useModule and useGraphql", async () => {
  await expect(
    wertik({
      database: {
        default: useMysqlDatabase(database),
      },
      modules: {
        test: useModule({
          name: "Shirts",
          useDatabase: true,
          database: "default",
          table: process.env.TEST_DATABASE_TABLE,
        }),
      },
      graphql: useGraphql(),
    })
  ).resolves.not.toThrowError()
})

test("Expect useWebsockets, useIndependentWebSocketsServer and useSocketIO works and does not throw any error", async () => {
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
    })
  ).resolves.not.toThrowError()
})
