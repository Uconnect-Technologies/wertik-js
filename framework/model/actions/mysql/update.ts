import {get} from "lodash";
import findOneByPK from "./findOneByPK";
export default async function (model,args,name) {
  let id = get(args,'id',null);
  let updateObject = await findOneByPK(model,id);
  let update = await updateObject.update(args);
  return update;
}