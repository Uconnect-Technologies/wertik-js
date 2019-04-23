import {get} from "lodash"; 
import convertFiltersIntoSequalizeObject from "./../../../database/mysql/convertFiltersIntoSequalizeObject.js";

export default async function (model,args = {}) {
  let pagination = get(args,'pagination',{page: 1, limit: 10});
  const {page, limit} = pagination;
  let filters = get(args,'filters',[]);
  console.log(await convertFiltersIntoSequalizeObject(filters));
  let data = await model.findAndCountAll();
  let pages = Math.ceil(data.count / limit);
  let offset = limit * (page - 1);
  let totalFilters = filters.length;
  let find = [];
  find = await model.findAll({ 
    offset: offset, 
    limit: limit,
  });
  return {
    filters: filters,
    pagination,
    list: find
  }
}