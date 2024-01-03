require("dotenv").config()

const {
  default: wertik,
  useModule,
  useMysqlDatabase,
  useGraphql,
} = require("../lib/index")

const { database } = require("./testUtils")

if (database.name) {
  test("Expect test database to connect and does not causes error", async () => {
    await expect(
      wertik({
        database: {
          default: useMysqlDatabase(database),
        },
      })
    ).resolves.not.toThrowError()
  })
}
