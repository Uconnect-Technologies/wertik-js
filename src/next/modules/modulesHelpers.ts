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

export const getType = (type: string) => {
  if (typeof type === "string") {
    type = type.toLowerCase()
  } else {
    return
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

export const getUpdateSchema = (props, tableInformation) => {
  const optionsUpdateSchema = get(props, "graphql.updateSchema", "")
  if (optionsUpdateSchema) return optionsUpdateSchema
  let updateSchema = [`input update${props.name}Input {`]
  tableInformation.forEach((element) => {
    updateSchema.push(`${element.Field}: ${getType(element.Type)}`)
  })
  updateSchema.push("}")

  return updateSchema.join("\n")
}

export const getCreateSchema = (props, tableInformation) => {
  const optionsCreateSchema = get(props, "graphql.createSchema", "")
  if (optionsCreateSchema) return optionsCreateSchema
  let createSchema = [`input create${props.name}Input {`]
  tableInformation.forEach((element) => {
    if (element.Field !== "id" && element.Type !== "timestamp") {
      createSchema.push(
        `${element.Field}: ${getType(element.Type)}${
          element.Null.toLowerCase() === "no" ? "!" : ""
        }`
      )
    }
  })
  createSchema.push("}")

  return createSchema.join("\n")
}
