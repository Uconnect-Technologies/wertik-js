import { get } from "lodash"

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
    return `${module.name}${column.Field}Enum`
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

export const getUpdateSchema = (module, tableInformation) => {
  const optionsUpdateSchema = get(module, "graphql.updateSchema", "")
  if (optionsUpdateSchema) return optionsUpdateSchema
  let updateSchema = [`input update${module.name}Input {`]
  tableInformation.forEach((element) => {
    updateSchema.push(
      `${element.Field}: ${getGraphQLTypeNameFromSqlType(element, module)}`
    )
  })
  updateSchema.push("}")

  return updateSchema.join("\n")
}

export const getCreateSchema = (module, tableInformation) => {
  const optionsCreateSchema = get(module, "graphql.createSchema", "")
  if (optionsCreateSchema) return optionsCreateSchema
  let createSchema = [`input create${module.name}Input {`]
  tableInformation.forEach((element) => {
    if (element.Field !== "id" && element.Type !== "timestamp") {
      createSchema.push(
        `${element.Field}: ${getGraphQLTypeNameFromSqlType(element, module)}${
          element.Null.toLowerCase() === "no" ? "!" : ""
        }`
      )
    }
  })
  createSchema.push("}")

  return createSchema.join("\n")
}

export const generateEnumTypeForGraphql = (column, module) => {
  var enums = column.Type.replace("enum(", "")
    .replace(")", "")
    .replace(/'/g, "")
    .split(",")
  return `enum ${module.name}${column.Field}Enum {
    ${enums.join("\n")}
   }`
}
