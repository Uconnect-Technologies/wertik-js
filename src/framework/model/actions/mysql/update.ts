let {get} = require("lodash");
import findOneByPK from "./findOneByPK";
export default async function (model: any, args: any, requestedFields: any) {
  let id = get(args,'id',null);
  let updateObject: any = await findOneByPK(model,id,requestedFields);
  let update = await updateObject.update(args);
  return update;
}