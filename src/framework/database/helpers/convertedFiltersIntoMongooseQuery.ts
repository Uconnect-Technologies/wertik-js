import parseMultipleValuesIntoArray from "../mysql/filters/parseMultipleValuesIntoArray";
import validateFiltersArray from "../../security/validateFiltersArray";

export default function (filters) {
  let f: any = {};
  if (validateFiltersArray(filters)) {
    filters.forEach((item: any) => {
      let operator = item.operator;
      let column = item.column;
      let value = item.value;
      if (!f[column]) {
        f[column] = {};
      }
      f[column][operator] = value
    });
  }
  return f;
}
