import { Sequelize } from "sequelize"
import { databaseDefaultOptions } from "../../utils/defaultOptions"
import { useMysqlDatabaseProps } from "../../types/database"
import { get } from "lodash"

export const getAllRelationships = (dbName: String) => {
  return `
    SELECT *
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE CONSTRAINT_SCHEMA = '${dbName}'
      AND REFERENCED_TABLE_SCHEMA IS NOT NULL
      AND REFERENCED_TABLE_NAME IS NOT NULL
      AND REFERENCED_COLUMN_NAME IS NOT NULL
  `
}

export const useMysqlDatabase = function (obj: useMysqlDatabaseProps) {
  return async () => {
    try {
      let sequelize = new Sequelize(obj.name, obj.username, obj.password, {
        host: obj.host,
        dialect: "mysql",
        logging: false,
        ...get(obj, "options", {}),
        ...(databaseDefaultOptions as any).sql.dbInitializeOptions,
      })
      await sequelize.authenticate()
      console.log(`[DB] Succcessfully connected to database ${obj.name}`)
      ;(sequelize as any).relationships = await sequelize.query(
        getAllRelationships(obj.name)
      )
      return {
        credentials: obj,
        instance: sequelize,
      }
    } catch (e) {
      console.log(`[DB] Connecting failed to datbase ${obj.name}`)
      console.log(e.message)
    }
  }
}

/**
 * @deprecated use useMysqlDatabase, useDatabase is deprecated and will be removed in 3.5.0 version.
 */
export const useDatabase = useMysqlDatabase
