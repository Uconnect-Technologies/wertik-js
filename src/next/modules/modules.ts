import { get } from "lodash"
import crud from "../crud"
import { databaseDefaultOptions } from "../../framework/defaults/options"
import { RelationParams, useModuleProps } from "../types/modules"
import {
  generateDataTypeFromDescribeTableColumnType,
  getCreateSchema,
  getGraphQLTypeNameFromSqlType,
  getUpdateSchema,
  generateEnumTypeForGraphql,
} from "./modulesHelpers"

const generateGenerateGraphQLCrud = (props, schemaInformation, store) => {
  const { graphql } = crud(props, schemaInformation, store)
  const resolvers = graphql.generateCrudResolvers()

  store.graphql.typeDefs = store.graphql.typeDefs.concat(
    `\n ${schemaInformation.schema} 
    \n ${schemaInformation.inputSchema.filters}
    \n ${schemaInformation.inputSchema.create}
    \n ${schemaInformation.inputSchema.update}
    `
  )

  store.graphql.typeDefs = store.graphql.typeDefs.concat(
    `\n ${graphql.generateQueriesCrudSchema()}`
  )
  store.graphql.typeDefs = store.graphql.typeDefs.concat(
    `\n ${graphql.generateMutationsCrudSchema()}`
  )

  store.graphql.resolvers.Query = {
    ...store.graphql.resolvers.Query,
    ...resolvers.Query,
  }

  store.graphql.resolvers.Mutation = {
    ...store.graphql.resolvers.Mutation,
    ...resolvers.Mutation,
  }
}

/**
 * Wertik js module
 * @param props see interface useModuleProps
 */
export const useModule = (module: useModuleProps) => {
  return async ({ store, configuration, app }: any) => {
    let tableInstance
    let graphqlSchema = []

    const useDatabase = get(module, "useDatabase", false)

    const useSchema = (string: string) => {
      store.graphql.typeDefs = store.graphql.typeDefs.concat(`
        ${string}
      `)
    }

    const useQuery = ({ query, resolver, name }) => {
      store.graphql.typeDefs = store.graphql.typeDefs.concat(`
        extend type Query {
          ${query}
        }
      `)
      store.graphql.resolvers.Query[name] = resolver
    }

    const useMutation = ({ query, resolver, name }) => {
      store.graphql.typeDefs = store.graphql.typeDefs.concat(`
        extend type Mutation {
          ${query}
        }
      `)
      store.graphql.resolvers.Mutation[name] = resolver
    }

    const useExpress = (fn = (express) => {}) => {
      setTimeout(() => {
        fn(app.express)
      }, 2500)
    }

    let listSchema = ""
    let filterSchema = []
    if (useDatabase) {
      var createSchema = []
      var updateSchema = []
      const connection = app.database[module.database]
      const describe = await connection.instance.query(
        `describe ${module.table}`
      )
      const tableInformation = describe[0]

      let fields = {}

      tableInformation.forEach((element) => {
        if (element.Field === "id") {
          return
        }
        const { type, length } = generateDataTypeFromDescribeTableColumnType(
          element.Type
        )
        fields[element.Field] = {
          type: {
            type: type,
            null: element.Null === "YES" ? true : false,
          },
        }
        tableInstance = connection.instance.define(module.table, fields, {
          ...get(module, "tableOptions", {}),
          ...databaseDefaultOptions.sql.defaultTableOptions,
        })
      })

      if (module?.graphql?.schema) {
        graphqlSchema = module.graphql.schema.replace("}", "").split("\n")
      } else {
        // graphql schema
        graphqlSchema = [`type ${module.name} {`]

        tableInformation.forEach((element) => {
          if (element.Type.includes("enum")) {
            store.graphql.typeDefs = store.graphql.typeDefs.concat(
              generateEnumTypeForGraphql(element, module)
            )
          }
          graphqlSchema.push(
            `${element.Field}: ${getGraphQLTypeNameFromSqlType(
              element,
              module
            )}`
          )
        })
      }

      updateSchema = getUpdateSchema(module, tableInformation)

      createSchema = getCreateSchema(module, tableInformation)

      filterSchema = [`input ${module.name}FilterInput {`]

      tableInformation.forEach((element) => {
        if (
          element.Type.includes("timestamp") ||
          element.Type.includes("datetime") ||
          element.Type.includes("varchar") ||
          element.Type.includes("text")
        ) {
          filterSchema.push(`${element.Field}: StringFilterInput`)
        } else if (
          element.Type.includes("int") ||
          element.Type.includes("number")
        ) {
          filterSchema.push(`${element.Field}: IntFilterInput`)
        }
      })

      listSchema = `
        query List${module.name} {
          list: [${module.name}]
          paginationProperties: PaginationProperties
          filters: ${module.name}Filters
        }
      `
    }

    const hasOne = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}`)
      store.database.relationships.push({
        currentModule: module.name,
        currentModuleDatabase: module.database,
        graphqlKey: params.graphqlKey,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "hasOne",
      })
    }
    const belongsTo = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}`)
      store.database.relationships.push({
        currentModule: module.name,
        currentModuleDatabase: module.database,
        graphqlKey: params.graphqlKey,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "belongsTo",
      })
    }
    const belongsToMany = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}List`)
      store.database.relationships.push({
        currentModule: module.name,
        currentModuleDatabase: module.database,
        graphqlKey: params.graphqlKey,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "belongsToMany",
      })
    }
    const hasMany = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}List`)
      store.database.relationships.push({
        currentModule: module.name,
        currentModuleDatabase: module.database,
        graphqlKey: params.graphqlKey,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "hasMany",
      })
    }

    get(module, "on", () => {})({
      useQuery,
      useMutation,
      useExpress,
      hasOne,
      belongsTo,
      belongsToMany,
      hasMany,
      useSchema,
    })

    if (useDatabase) {
      graphqlSchema.push("}")
      filterSchema.push("}")
    }

    const schemaInformation = {
      tableInstance: tableInstance,
      schema: graphqlSchema.join(`\n`),
      inputSchema: {
        create: createSchema || "",
        update: updateSchema || "",
        list: listSchema,
        filters: filterSchema.join("\n"),
      },
    }

    if (useDatabase) {
      generateGenerateGraphQLCrud(module, schemaInformation, store)
      app.models[module.name] = tableInstance
    }

    console.log(`[Module]`, `Initialized module "${module.name}"`)

    return schemaInformation
  }
}
