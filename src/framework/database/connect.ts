import { get } from "lodash"
import { Sequelize } from "sequelize"

import { successMessage } from "../logger/consoleMessages"
import { IConfigurationDatabase } from "../types/configuration"
import { databaseDefaultOptions } from "../defaults/options/index"

export default async function (database: IConfigurationDatabase) {
  return new Promise(async (resolve, reject) => {
    try {
      let DATABASE_INSTANCE
      let dialect = database.dbDialect
      let options
      if (dialect == "postgres") {
        options = get(
          database,
          "dbInitializeOptions",
          databaseDefaultOptions.postgres.dbInitializeOptions
        )
        DATABASE_INSTANCE = new Sequelize(
          `${database.dbName}`,
          database.dbUsername,
          database.dbPassword,
          {
            dialect: "postgres",
            host: database.dbHost,
            port: database.dbPort,
            ...options,
          }
        )
      } else if (dialect === "mysql") {
        options = get(
          database,
          "dbInitializeOptions",
          databaseDefaultOptions.sql.dbInitializeOptions
        )
        DATABASE_INSTANCE = new Sequelize(
          `${database.dbName}`,
          database.dbUsername,
          database.dbPassword,
          {
            dialect: "mysql",
            host: database.dbHost,
            port: database.dbPort,
            ...options,
          }
        )
      }
      DATABASE_INSTANCE.authenticate()
        .then(() => {
          successMessage(`Database: Successfully Connected!`)
        })
        .catch((e) => {
          console.log(e)
          process.exit()
        })
      resolve(DATABASE_INSTANCE)
    } catch (e) {
      reject(e)
    }
  })
}
