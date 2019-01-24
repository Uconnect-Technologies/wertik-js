import {get} from "lodash"; 
export default async function (model,args) {
  let limit = get(args,'limit',20);
  let page = get(args,'page',1);
  let data = await model.findAndCountAll();
  let pages = Math.ceil(data.count / limit);
  let offset = limit * (page - 1);
  let find =  await model.findAll({ offset: offset, limit: limit });
  return find;
}