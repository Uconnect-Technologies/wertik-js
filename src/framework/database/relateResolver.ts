import { get } from "lodash";
import primaryKey from "./../helpers/primaryKey";

export default async function(obj: any) {
  let { model, relateWith, type, relationName } = obj;
  if (type == "multiple") {
  } else {
    return await relateWith.findOne({ [relationName]: model[primaryKey] });
  }
}
