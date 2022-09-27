import get from 'lodash.get'

export const generateDataTypeFromDescribeTableColumnType = (
  Type: string
<<<<<<< HEAD
): {
  length: string | undefined
  type: string
} => {
=======
): { length: string | undefined; type: string } => {
>>>>>>> 681bf23 (Fixing lint issues)
  const length = Type.match(/[0-9]/g)?.join('')
  let type = Type.replace(/[0-9]/g, '')
    .replace('(', '')
    .replace(')', '')
    .split(' ')[0]
    .toUpperCase()

  if (type.toLowerCase().includes('varchar')) {
    type = 'STRING'
  }

  if (type.toLowerCase() === 'int') {
    type = 'INTEGER'
  }

  return { length, type }
}

export const getGraphQLTypeNameFromSqlType = (
  column: {
    Type: string
    Field: string
  },
<<<<<<< HEAD
  module
=======
  module: { name: string }
>>>>>>> 681bf23 (Fixing lint issues)
): string | undefined => {
  let type = column.Type
  if (typeof column.Type === 'string') {
    type = type.toLowerCase()
  } else {
    return
  }
  if (type.includes('enum')) {
    return `${module.name}${column.Field}Enum`
  }
  if (
    type.includes('varchar') ||
    type.includes('timestamp') ||
    type.includes('datetime') ||
    type.includes('text')
  ) {
    return 'String'
  }

  if (type.includes('json')) {
    return 'JSON'
  }

  if (type.includes('int')) {
    return 'Int'
  }

  return undefined
}

export const getUpdateSchema = (
  module: { name: string },
  tableInformation
): string => {
  const optionsUpdateSchema = get(module, 'graphql.updateSchema', '')
  if (optionsUpdateSchema) return optionsUpdateSchema
  const updateSchema = [`input update${module.name}Input {`]
  tableInformation.forEach(
    (element: { Type: string; Field: string; Null: string }) => {
      const type = getGraphQLTypeNameFromSqlType(element, module)
      if (type) updateSchema.push(`${element.Field}: ${type}`)
    }
  )
  updateSchema.push('}')

  return updateSchema.join('\n')
}

export const getCreateSchema = (
  module: { name: string },
  tableInformation
): string => {
  const optionsCreateSchema = get(module, 'graphql.createSchema', '')
  if (optionsCreateSchema) return optionsCreateSchema
  const createSchema = [`input create${module.name}Input {`]
  tableInformation.forEach(
    (element: { Type: string; Field: string; Null: string }) => {
      if (element.Field !== 'id' && element.Type !== 'timestamp') {
        const type = getGraphQLTypeNameFromSqlType(element, module)
        if (type)
          createSchema.push(
            `${element.Field}: ${type}${
              element.Null.toLowerCase() === 'no' ? '!' : ''
            }`
          )
      }
    }
  )
  createSchema.push('}')

  return createSchema.join('\n')
}

export const generateEnumTypeForGraphql = (
  column: { Type: string; Field: string },
  module: { name: string }
): string => {
  const enums: string[] = column.Type.replace('enum(', '')
    .replace(')', '')
    .replace(/'/g, '')
    .split(',')
  return `enum ${module.name}${column.Field}Enum {
    ${enums.join('\n')}
   }`
}
