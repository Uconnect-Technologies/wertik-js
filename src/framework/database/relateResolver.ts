import { get } from "lodash";
import primaryKey from "./../helpers/primaryKey";

export default async function(obj: any) {
  let { model, relateWith, type } = obj;
  if (type == "multiple") {
  } else {
    return await relateWith.findOne({ [primaryKey]: model[primaryKey] });
  }
}
