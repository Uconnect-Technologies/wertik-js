import { get } from "lodash"
import crud from "../crud"
import { databaseDefaultOptions } from "../utils/defaultOptions"
import { RelationParams, useModuleProps } from "../types/modules"
import {
  getCreateSchema,
  getUpdateSchema,
  generateEnumTypeForGraphql,
} from "./modulesHelpers"
import { getMysqlTableInfo } from "../database/mysql/getTableInfo"
import { Store, WertikApp, WertikConfiguration } from "./../types/index"
import { ModelCtor, Model, ModelAttributes } from "sequelize/types"

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
export const useModule = (moduleProps: useModuleProps) => {
  return async ({
    store,
    configuration,
    app,
  }: {
    store: Store
    configuration: WertikConfiguration
    app: WertikApp
  }) => {
    let tableInstance: ModelCtor<Model<any, any>>
    let graphqlSchema = []

    const useDatabase = get(moduleProps, "useDatabase", false)

    const { table, database, name } = moduleProps
    if (useDatabase && (!table || !database)) {
      throw new Error(
        `${name} is using database please pass database and/or table name`
      )
    }

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
      const connection = app.database[moduleProps.database]
      // info
      const tableInfo = await getMysqlTableInfo(
        moduleProps,
        connection.instance
      )
      // console.log(tableInfo)

      let fields: ModelAttributes<Model<any, any>, any> = {}

      tableInfo.columns.forEach((column) => {
        if (column.columnName === "id") return
        fields[column.columnName] = {
          type: column.databaseType,
          allowNull: column.isNull,
          defaultValue: column.default,
          primaryKey: column.isPrimary,
          values: column.isEnum ? column.enumValues : null,
        }
      })

      tableInstance = connection.instance.define(
        moduleProps.table,
        {
          ...fields,
          ...get(moduleProps, "extendFields", {}),
        },
        {
          ...get(moduleProps, "tableOptions", {}),
          ...databaseDefaultOptions.sql.defaultTableOptions,
        }
      )

      if (moduleProps?.graphql?.schema) {
        graphqlSchema = moduleProps.graphql.schema.replace("}", "").split("\n")
      } else {
        // graphql schema
        graphqlSchema = [`type ${moduleProps.name} {`]

        tableInfo.columns.forEach((columnInfo) => {
          if (columnInfo.isEnum) {
            store.graphql.typeDefs = store.graphql.typeDefs.concat(
              generateEnumTypeForGraphql(columnInfo)
            )
          }
          graphqlSchema.push(
            `${columnInfo.columnName}: ${columnInfo.graphqlType}`
          )
        })
      }

      updateSchema = getUpdateSchema(moduleProps, tableInfo)

      createSchema = getCreateSchema(moduleProps, tableInfo)

      filterSchema = [`input ${moduleProps.name}FilterInput {`]

      tableInfo.columns.forEach((column) => {
        let filterInput =
          column.databaseType.toLowerCase() === "enum"
            ? `${column.columnName}: ${column.graphqlType}`
            : `${column.columnName}: ${column.graphqlType}FilterInput`

        filterSchema.push(filterInput)
      })

      listSchema = `
        query List${moduleProps.name} {
          list: [${moduleProps.name}]
          paginationProperties: PaginationProperties
          filters: ${moduleProps.name}Filters
        }
      `
    }

    const hasOne = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}`)
      store.database.relationships.push({
        currentModule: moduleProps.name,
        currentModuleDatabase: moduleProps.database,
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
        currentModule: moduleProps.name,
        currentModuleDatabase: moduleProps.database,
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
        currentModule: moduleProps.name,
        currentModuleDatabase: moduleProps.database,
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
        currentModule: moduleProps.name,
        currentModuleDatabase: moduleProps.database,
        graphqlKey: params.graphqlKey,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "hasMany",
      })
    }

    get(moduleProps, "on", () => {})({
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
      generateGenerateGraphQLCrud(moduleProps, schemaInformation, store)
      app.models[moduleProps.name] = tableInstance
    }

    console.log(`[Module]`, `Initialized module "${moduleProps.name}"`)

    return schemaInformation
  }
}
