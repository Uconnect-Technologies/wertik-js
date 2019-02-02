import {get} from "lodash"; 
export default async function (model,args = {}) {
  let limit = get(args,'limit',20);
  let page = get(args,'page',1);
  let data = await model.findAndCountAll();
  let pages = Math.ceil(data.count / limit);
  let offset = limit * (page - 1);
  let filters = args;
  delete filters['limit'];
  delete filters['page'];
  let totalFilters = Object.keys(filters).length;
  let find = [];
  if (totalFilters > 0) {
    find = await model.findAll({ 
      offset: offset, 
      limit: limit,
      where: filters
    });
  }else {
    find = await model.findAll({ 
      offset: offset, 
      limit: limit
    });
  }
  return find;
}