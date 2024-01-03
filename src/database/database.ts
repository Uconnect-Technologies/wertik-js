import { wLog, wLogWithInfo } from "../utils/log"
import { Store, WertikApp } from "../types"
import logSymbols from "log-symbols"

export const applyRelationshipsFromStoreToDatabase = async (
  store: Store,
  app: WertikApp
) => {
  if (store.database.relationships.length > 0)
    wLogWithInfo("[Wertik-Database]", "Registering relationships \n")
  store.database.relationships.forEach((element) => {
    const currentTable = app.modules[element.currentModule].tableInstance
    const referencedTable = app.modules[element.referencedModule].tableInstance
    const currentTableName = currentTable.getTableName() as string
    const referencedTableName = referencedTable.getTableName() as string

    wLog(
      logSymbols.success,
      `${currentTableName}.${
        element.type
      }(${referencedTableName}, ${JSON.stringify(element.options)})`
    )

    // element.type will be hasOne, hasMany, belongsTo or belongsToMany
    currentTable[element.type](referencedTable, element.options || {})
  })
  if (store.database.relationships.length > 0) wLog("\n")
}
