require("dotenv").config()

const {
  default: wertik,
  useModule,
  useMysqlDatabase,
  useGraphql,
} = require("../lib/index")

const database = {
  name: process.env.TEST_DATABASE_NAME,
  host: process.env.TEST_DATABASE_HOST,
  password: process.env.TEST_DATABASE_PASSWORD,
  port: process.env.TEST_DATABASE_PORT,
  username: process.env.TEST_DATABASE_USERNAME,
}

const shirtModule = {
  name: "Shirts",
  useDatabase: true,
  database: "default",
  table: process.env.TEST_DATABASE_TABLE,
}

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

if (database.name) {
  describe("Expect useMysqlDatabase, useModule and useGraphql, and expect module graphql operations work", () => {
    let app
    test("Expect test database to connect and does not causes error", async () => {
      await expect(
        (app = wertik({
          database: {
            default: useMysqlDatabase(database),
          },
          modules: {
            shirt: useModule(shirtModule),
          },
          graphql: useGraphql(),
        }).then((wertikApp) => {
          app = wertikApp
        }))
      ).resolves.not.toThrowError()
    })

    let testItem = null

    test("Expect graphql to insert data", async () => {
      // describe create works
      testItem = await app.graphql.executeOperation({
        query: `
        mutation {
        insertShirts(input: {
          sizes: lg
          user_id: 12
        }) {
          returning {
            id
            user_id
            sizes
          }
        }
      }
      `,
      })
      expect(testItem.data.insertShirts.returning[0].id).toBeGreaterThan(0)
      expect(testItem.data.insertShirts.returning[0].sizes).toBe("lg")
    })
    // update
    test(`Expect graphql to update data`, async () => {
      let updatedItem = await app.graphql.executeOperation({
        query: `
          mutation {
            updateShirts(input: { sizes: xxxl}, where: { id: { _eq: ${testItem.data.insertShirts.returning[0].id} } }) {
              returning {
                id
                sizes
              }
            }
          }        
      `,
      })
      expect(updatedItem.data.updateShirts.returning[0].id).toBeGreaterThan(0)
      expect(updatedItem.data.updateShirts.returning[0].sizes).toBe("xxxl")
    })
    // view
    test("Expect graphql to view data", async () => {
      let viewItem = await app.graphql.executeOperation({
        query: `
          query {
            viewShirts(where: { sizes: xxxl }) {
              id
              sizes
            }
          }
          
      `,
      })
      expect(viewItem.data.viewShirts.sizes).toBe("xxxl")
    })
    // deleted
    test("Expect graphql to delete data", async () => {
      let deletedItem = await app.graphql.executeOperation({
        query: `
            mutation {
                deleteShirts(where: { id: { _eq: ${testItem.data.insertShirts.returning[0].id} } }) {
                  message
                }
              }              
        `,
      })
      expect(deletedItem.data.deleteShirts.message.length).toBeGreaterThan(0)
    })
  })
}
