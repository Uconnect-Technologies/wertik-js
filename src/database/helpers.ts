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
  if (limit) limit[0]

  if (numberTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `Int`,
      graphqlCreateInputType: `Int`,
      graphqlUpdateInputType: `Int${isPrimary ? "!" : ""}`,
    }
  } else if (jsonTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `JSON`,
      graphqlCreateInputType: `String${columnInfo.Null === "NO" ? "!" : ""}`,
      graphqlUpdateInputType: `String${columnInfo.Null === "NO" ? "!" : ""}`,
    }
  } else if (stringTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `String`,
      graphqlCreateInputType: `String${columnInfo.Null === "NO" ? "!" : ""}`,
      graphqlUpdateInputType: `String${columnInfo.Null === "NO" ? "!" : ""}`,
    }
  } else if (dateTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `String`,
      graphqlCreateInputType: `String${columnInfo.Null === "NO" ? "!" : ""}`,
      graphqlUpdateInputType: `String${columnInfo.Null === "NO" ? "!" : ""}`,
    }
  } else if (enumTypes.find((c) => columnInfo.Type.includes(c))) {
    return {
      graphqlType: `${capitalizeFirstLetter(tableName)}${capitalizeFirstLetter(
        columnInfo.Field
      )}Enum`,
      graphqlCreateInputType: `String`,
      graphqlUpdateInputType: `String`,
      isEnum: true,
      enumValues: columnInfo.Type.replace("enum(", "")
        .replace("ENUM(", "")
        .replace(")", "")
        .replace(/'/g, "")
        .split(","),
    }
  }
}
