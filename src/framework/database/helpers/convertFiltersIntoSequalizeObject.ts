import replaceFilterOperators from "../../helpers/replaceFilterOperators"
export default async function (filters: any) {
  if (filters) {
    let output = replaceFilterOperators(filters)
    return output
  } else {
    return {}
  }
}
