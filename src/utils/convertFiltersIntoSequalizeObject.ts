import replaceFilterOperators from "./replaceFilterOperators"

const convertFiltersIntoSequalizeObject = (filters) => {
  return filters ? replaceFilterOperators(filters) : {}
}

export default async (filters) => convertFiltersIntoSequalizeObject(filters)
