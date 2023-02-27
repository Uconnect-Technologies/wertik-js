import get from "lodash.get"
import { wLogWithDateWithInfo } from "../utils/log"
import { convertGraphqlRequestedFieldsIntoInclude } from "../database/eagerLoadingGraphqlQuery"
import { generateRequestedFieldsFromGraphqlInfo } from "../modules/modulesHelpers"
import convertFiltersIntoSequelizeObject from "../utils/convertFiltersIntoSequelizeObject"
import graphqlFields from "graphql-fields"
import { paginate } from "./paginate"

export default function (module, schemaInformation, store) {
  return {
    graphql: {
      generateQueriesCrudSchema() {
        return `

        type ${module.name}List {
            list: [${module.name}]
            pagination: Pagination
            sorting: Sorting
            paginationProperties: PaginationProperties @deprecated(reason: "Use pagination instead")
        }
        type ${module.name}BulkMutationResponse {
            returning: [${module.name}]
            affectedRows: Int
        }
        type Count${module.name} {
            count: Int
        }

        extend type Query {
            view${module.name}(where: ${module.name}FilterInput): ${module.name}
            list${module.name}(pagination: PaginationInput, where: ${module.name}FilterInput, sorting: [SortingInput]): ${module.name}List
            count${module.name}(where: ${module.name}FilterInput):  Int
        }`
      },
      generateMutationsCrudSchema() {
        return `
            extend type Mutation {
              update${module.name}(input: update${module.name}Input,where: ${module.name}FilterInput!): ${module.name}BulkMutationResponse
              create${module.name}(input: [create${module.name}Input]): ${module.name}BulkMutationResponse
              delete${module.name}(where: ${module.name}FilterInput!): SuccessResponse
              createOrUpdate${module.name}(id: Int, input: create${module.name}Input): ${module.name}
            }
          `
      },
      generateCrudResolvers() {
        return {
          Mutation: {
            [`createOrUpdate${module.name}`]: get(
              module,
              "graphql.mutations.createOrUpdate",
              async (_, args, context, info) => {
                wLogWithDateWithInfo(
                  "[Wertik-GraphQL-Mutation]",
                  `${info.fieldName} - ${JSON.stringify(args)}`
                )
                const argsFromEvent = await get(
                  module,
                  "events.beforeCreateOrUpdate",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const id = args.id
                let ___find: any
                if (id) {
                  ___find = await schemaInformation.tableInstance.findOne({
                    where: {
                      id: id,
                    },
                  })

                  if (!___find) {
                    throw new Error(`${module.name} Not found`)
                  }

                  await schemaInformation.tableInstance.update(args.input, {
                    where: { id: id },
                  })

                  return await schemaInformation.tableInstance.findOne({
                    where: { id: id },
                  })
                } else {
                  return await schemaInformation.tableInstance.create(
                    args.input
                  )
                }
              }
            ),
            [`update${module.name}`]: get(
              module,
              "graphql.mutations.update",
              async (_, args, context, info) => {
                wLogWithDateWithInfo(
                  "[Wertik-GraphQL-Mutation]",
                  `${info.fieldName} - ${JSON.stringify(args)}`
                )
                const argsFromEvent = await get(
                  module,
                  "events.beforeUpdate",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const where = await convertFiltersIntoSequelizeObject(
                  args.where
                )
                const response = await schemaInformation.tableInstance.update(
                  args.input,
                  {
                    where: where,
                  }
                )
                const all = await schemaInformation.tableInstance.findAll({
                  where: where,
                })
                return {
                  returning: all,
                  affectedRows: response[0],
                }
              }
            ),
            [`delete${module.name}`]: get(
              module,
              "graphql.mutations.delete",
              async (_, args, context, info) => {
                wLogWithDateWithInfo(
                  "[Wertik-GraphQL-Mutation]",
                  `${info.fieldName} - ${JSON.stringify(args)}`
                )
                const argsFromEvent = await get(
                  module,
                  "events.beforeDelete",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const where = await convertFiltersIntoSequelizeObject(
                  args.where
                )
                await schemaInformation.tableInstance.destroy({
                  where: where,
                })
                return { message: `${module.name} Deleted` }
              }
            ),
            [`create${module.name}`]: get(
              module,
              "graphql.mutations.create",
              async (_, args, context, info) => {
                wLogWithDateWithInfo(
                  "[Wertik-GraphQL-Mutation]",
                  `${info.fieldName} - ${JSON.stringify(args)}`
                )
                const argsFromEvent = await get(
                  module,
                  "events.beforeCreate",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const response = []
                for (const input of args.input) {
                  response.push(
                    await schemaInformation.tableInstance.create(input)
                  )
                }
                return {
                  returning: response,
                  affectedRows: response.length,
                }
              }
            ),
          },
          Query: {
            [`view${module.name}`]: get(
              module,
              "graphql.queries.view",
              async (_, args, context, info) => {
                wLogWithDateWithInfo(
                  "[Wertik-GraphQL-Query]",
                  `${info.fieldName} - ${JSON.stringify(args)}`
                )
                const argsFromEvent = await get(
                  module,
                  "events.beforeView",
                  function () {}
                )(_, args, context, info)

                args = argsFromEvent ? argsFromEvent : args
                const where = await convertFiltersIntoSequelizeObject(
                  args.where
                )

                const find = await schemaInformation.tableInstance.findOne({
                  where: where,
                  attributes: generateRequestedFieldsFromGraphqlInfo(
                    graphqlFields(info)
                  ),
                  include: convertGraphqlRequestedFieldsIntoInclude(
                    graphqlFields(info, {}, { processArguments: true })
                  ),
                })

                return find
              }
            ),
            [`list${module.name}`]: get(
              module,
              "graphql.queries.list",
              async (_, args, context, info) => {
                wLogWithDateWithInfo(
                  "[Wertik-GraphQL-Query]",
                  `list${module.name} - args ${JSON.stringify(args)}`
                )
                const argsFromEvent = await get(
                  module,
                  "events.beforeList",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args

                return await paginate(
                  args,
                  schemaInformation.tableInstance,
                  convertGraphqlRequestedFieldsIntoInclude(
                    graphqlFields(info, {}, { processArguments: true })
                  ),
                  {
                    attributes: generateRequestedFieldsFromGraphqlInfo(
                      graphqlFields(info).list
                    ),
                  }
                )
              }
            ),
            [`count${module.name}`]: get(
              module,
              "graphql.queries.count",
              async (_, args, context, info) => {
                wLogWithDateWithInfo(
                  "[Wertik-GraphQL-Query]",
                  `${info.fieldName} - ${JSON.stringify(args)}`
                )
                const argsFromEvent = await get(
                  module,
                  "events.beforeCount",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const where = await convertFiltersIntoSequelizeObject(
                  args.where
                )
                const count = await schemaInformation.tableInstance.count({
                  where: where,
                })
                return count
              }
            ),
          },
        }
      },
    },
  }
}
