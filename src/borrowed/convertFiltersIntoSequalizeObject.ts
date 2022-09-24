import replaceFilterOperators from './replaceFilterOperators'
export default function (filters: any): any {
  if (filters) {
    const output = replaceFilterOperators(filters)
    return output
  } else {
    return {}
  }
}
