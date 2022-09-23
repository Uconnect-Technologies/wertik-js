import replaceFilterOperators from './replaceFilterOperators'
export default async function (filters: any) {
  if (filters) {
    const output = replaceFilterOperators(filters)
    return output
  } else {
    return {}
  }
}
