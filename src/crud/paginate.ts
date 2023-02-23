import store from "../store"
import convertFiltersIntoSequelizeObject from "../utils/convertFiltersIntoSequelizeObject"
import get from "lodash.get"
export const paginate = async (arg, tableInstance, include: any[] = []) => {
  const { page = 1, limit = 100, sorting = [] } = arg.pagination ?? {}
  const offset = limit * (page - 1)
  const where = convertFiltersIntoSequelizeObject(arg.where)
  const includes = include.map((c) => {
    const _where = convertFiltersIntoSequelizeObject(
      get(arg, `where.${c.referencedModule}`, {})
    )
    delete where[c.referencedModule]
    return {
      model: store.database.models[c.referencedModule],
      as: c.options.as,
      where: _where,
      required: false
    }
  })

  const { count, rows } = await tableInstance.findAndCountAll({
    where,
    offset,
    limit,
    order: sorting.map(({ column, type }) => [column, type]),
    include: includes,
  })

  const totalPages = Math.ceil(count / limit)
  const pagination = {
    total: count,
    nextPage: page + 1,
    page,
    previousPage: page === 1 ? 1 : page - 1,
    pages: totalPages,
    hasMore: page < totalPages,
    limit,
  }
  return {
    list: rows,
    paginationProperties: pagination,
    pagination,
  }
}
