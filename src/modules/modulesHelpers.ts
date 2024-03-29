import { get } from "lodash"
import { useModuleProps } from "../types/modules"
import { TableInfo } from "../types/database"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"

export const generateDataTypeFromDescribeTableColumnType = (Type: string) => {
  let length = Type.match(/[0-9]/g)?.join("")
  let type = Type.replace(/[0-9]/g, "")
    .replace("(", "")
    .replace(")", "")
    .split(" ")[0]
    .toUpperCase()

  if (type.toLowerCase().includes("varchar")) {
    type = "STRING"
  }

  if (type.toLowerCase() === "int") {
    type = "INTEGER"
  }

  return { length, type }
}

export const getGraphQLTypeNameFromSqlType = (
  column: {
    Type: string
    Field: string
  },
  module
) => {
  var type = column.Type
  if (typeof column.Type === "string") {
    type = type.toLowerCase()
  } else {
    return
  }
  if (type.includes("enum")) {
    return `${capitalizeFirstLetter(module.name)}${capitalizeFirstLetter(
      column.Field
    )}Enum`
  }
  if (
    type.includes("varchar") ||
    type.includes("timestamp") ||
    type.includes("datetime") ||
    type.includes("text")
  ) {
    return `String`
  }

  if (type.includes("json")) {
    return "JSON"
  }

  if (type.includes("int")) {
    return `Int`
  }
}

export const getUpdateSchema = (
  module: useModuleProps,
  tableInfo: TableInfo
) => {
  const optionsUpdateSchema = get(module, "graphql.updateSchema", "")
  if (optionsUpdateSchema) return optionsUpdateSchema
  let updateSchema = [`input update${module.name}Input {`]
  tableInfo.columns.forEach((column) => {
    if (column.columnName !== "id" && !column.isDateColumn) {
      updateSchema.push(
        `${column.columnName}: ${column.graphqlUpdateInputType}`
      )
    }
  })
  updateSchema.push("}")

  return updateSchema.join("\n")
}

export const getCreateSchema = (
  module: useModuleProps,
  tableInfo: TableInfo
) => {
  const optionsCreateSchema = get(module, "graphql.createSchema", "")
  if (optionsCreateSchema) return optionsCreateSchema
  let createSchema = [`input create${module.name}Input {`]
  tableInfo.columns.forEach((column) => {
    if (column.columnName !== "id" && !column.isDateColumn) {
      createSchema.push(
        `${column.columnName}: ${column.graphqlCreateInputType}`
      )
    }
  })
  createSchema.push("}")

  return createSchema.join("\n")
}

export const generateEnumTypeForGraphql = (column: TableInfo["columns"][0]) => {
  return `enum ${column.graphqlType} {
    ${column.enumValues.join("\n")}
   }`
}
