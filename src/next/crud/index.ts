import { get } from "lodash"
import convertFiltersIntoSequalizeObject from "./../../framework/database/helpers/convertFiltersIntoSequalizeObject"

export const paginate = async (arg, tableInstance) => {
  let page = get(arg, "pagination.page", 1)
  let limit = get(arg, "pagination.limit", 100)
  let sorting = get(arg, "sorting", [])
  let offset = limit * (page - 1)
  const where = await convertFiltersIntoSequalizeObject(arg.where)
  const find = await tableInstance.findAndCountAll({
    where: where,
    offset: offset,
    limit: limit,
    order: sorting.map((c) => {
      return [c.column, c.type]
    }),
  })
  const totalPages = Math.ceil(find.count / limit)
  return {
    list: find.rows,
    paginationProperties: {
      total: find.count,
      nextPage: page + 1,
      page: page,
      previousPage: page == 1 ? 1 : page - 1,
      pages: totalPages,
      hasMore: page < totalPages,
      limit: limit,
    },
  }
}

export default function (module, schemaInformation, store) {
  return {
    graphql: {
      generateQueriesCrudSchema() {
        return `

        type ${module.name}List {
            list: [${module.name}]
            pagination: Pagination
            sorting: Sorting
            paginationProperties: PaginationProperties
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
                const argsFromEvent = await get(
                  module,
                  "events.beforeUpdate",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const where = await convertFiltersIntoSequalizeObject(
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
                const argsFromEvent = await get(
                  module,
                  "events.beforeDelete",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const where = await convertFiltersIntoSequalizeObject(
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
                const argsFromEvent = await get(
                  module,
                  "events.beforeView",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const where = await convertFiltersIntoSequalizeObject(
                  args.where
                )
                const find = await schemaInformation.tableInstance.findOne({
                  where: where,
                })
                return find
              }
            ),
            [`list${module.name}`]: get(
              module,
              "graphql.queries.list",
              async (_, args, context, info) => {
                const argsFromEvent = await get(
                  module,
                  "events.beforeList",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                return await paginate(args, schemaInformation.tableInstance)
              }
            ),
            [`count${module.name}`]: get(
              module,
              "graphql.queries.count",
              async (_, args, context, info) => {
                const argsFromEvent = await get(
                  module,
                  "events.beforeCount",
                  function () {}
                )(_, args, context, info)
                args = argsFromEvent ? argsFromEvent : args
                const where = await convertFiltersIntoSequalizeObject(
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
