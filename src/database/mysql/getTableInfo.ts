import { useModuleProps } from "src/types/modules"
import { convertDatabaseTypeIntoGraphqlType } from "../helpers"
import { MysqlColumnInfoDescribeTable, TableInfo } from "./../../types/database"

export const numberTypes = [
  "bit",
  "tinyint",
  "smallint",
  "mediumtint",
  "int",
  "integer",
  "bigint",
  "decimal",
  "dec",
  "float",
  "double",
]
export const dateTypes = ["date", "time", "datetime", "timestamp", "year"]
export const stringTypes = [
  "string",
  "char",
  "varchar",
  "binary",
  "varbinary",
  "blob",
  "text",
  "set",
]
export const enumTypes = ["enum"]
export const jsonTypes = ["json"]

export const getMysqlTableInfo = async (
  module: useModuleProps,
  sequelize: any
): Promise<TableInfo> => {
  let rows = await sequelize.query(`describe ${module.table};`)
  rows = rows[0]

  if (rows) {
    const fields: TableInfo["columns"] = (
      rows as MysqlColumnInfoDescribeTable[]
    ).map((element) => {
      const graphqlType = convertDatabaseTypeIntoGraphqlType(
        element,
        module.name
      )
      var isPrimary = element.Key === "PRI"

      return {
        columnName: element.Field,
        default: element.Default,
        graphqlType: graphqlType.graphqlType,
        graphqlCreateInputType: graphqlType.graphqlCreateInputType,
        graphqlUpdateInputType: graphqlType.graphqlUpdateInputType,
        enumValues: graphqlType.enumValues,
        isNull: element.Null === "no" ? false : true,
        isEnum: graphqlType.isEnum,
        databaseType: graphqlType.databaseType,
        isPrimary: isPrimary,
        isDateColumn: graphqlType.isDateColumn,
      } as TableInfo["columns"][0]
    })
    return {
      name: module.table,
      columns: fields,
      originalDescribeColumns: rows,
    }
  }

  return {
    name: module.table,
    columns: [],
    originalDescribeColumns: rows,
  }
}
