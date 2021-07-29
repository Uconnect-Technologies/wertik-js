import replaceFilterOperators from "../../helpers/replaceFilterOperators";
export default async function (filters: any) {
  let output = replaceFilterOperators(filters);
  return output;
}
