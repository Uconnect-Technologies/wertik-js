import { MysqlColumnInfoDescribeTable } from "src/types/database"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"
import {
  numberTypes,
  dateTypes,
  stringTypes,
  enumTypes,
  jsonTypes,
} from "./mysql/getTableInfo"

export const convertDatabaseTypeIntoGraphqlType = (
  columnInfo: MysqlColumnInfoDescribeTable,
  tableName: string
) => {
  var isPrimary = columnInfo.Key === "PRI"
  var limit = columnInfo.Type.match(/\d+/g)
  var isRequiredIndicator = columnInfo.Null === "NO" ? "!" : ""
  if (limit) limit[0]

  if (columnInfo.Type.toLowerCase() === "tinyint(1)") {
    return {
      graphqlType: `Boolean`,
      graphqlCreateInputType: `Boolean${isRequiredIndicator}`,
      graphqlUpdateInputType: `Boolean${isRequiredIndicator}`,
      databaseType: "INTEGER",
    }
  } else if (numberTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `Int`,
      graphqlCreateInputType: `Int`,
      graphqlUpdateInputType: `Int${isPrimary ? "!" : ""}`,
      databaseType: "INTEGER",
    }
  } else if (jsonTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `JSON`,
      graphqlCreateInputType: `String${isRequiredIndicator}`,
      graphqlUpdateInputType: `String${isRequiredIndicator}`,
      databaseType: "STRING",
    }
  } else if (stringTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `String`,
      graphqlCreateInputType: `String${isRequiredIndicator}`,
      graphqlUpdateInputType: `String${isRequiredIndicator}`,
      databaseType: "STRING",
    }
  } else if (dateTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `String`,
      graphqlCreateInputType: `String${isRequiredIndicator}`,
      graphqlUpdateInputType: `String${isRequiredIndicator}`,
      databaseType: "STRING",
      isDateColumn: true,
    }
  } else if (enumTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `${capitalizeFirstLetter(tableName)}${capitalizeFirstLetter(
        columnInfo.Field
      )}Enum`,
      graphqlCreateInputType: `${capitalizeFirstLetter(
        tableName
      )}${capitalizeFirstLetter(columnInfo.Field)}Enum${isRequiredIndicator}`,
      graphqlUpdateInputType: `${capitalizeFirstLetter(
        tableName
      )}${capitalizeFirstLetter(columnInfo.Field)}Enum${isRequiredIndicator}`,
      databaseType: "ENUM",
      isEnum: true,
      enumValues: columnInfo.Type.replace("enum(", "")
        .replace("ENUM(", "")
        .replace(")", "")
        .replace(/'/g, "")
        .split(","),
    }
  }
}
