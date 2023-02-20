import replaceFilterOperators from "./replaceFilterOperators"

const convertFiltersIntoSequelizeObject = (filters) => {
  return filters ? replaceFilterOperators(filters) : {}
}

export default async (filters) => convertFiltersIntoSequelizeObject(filters)
