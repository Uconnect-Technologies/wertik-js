let {get} = require("lodash");
import convertFiltersIntoSequalizeObject from "./../../../database/mysql/convertFiltersIntoSequalizeObject";

export default async function (model: any,args: any = {},requestedFields: any = []) {
  console.log(requestedFields)
  let page = get(args,'pagination.page',1);
  let limit = get(args,'pagination.limit',10);
  let filters = get(args,'filters',[]);
  let convertedFilters = await convertFiltersIntoSequalizeObject(filters);
  let offset = limit * (page - 1);
  let totalFilters = filters.length;
  let find = [];
  if (totalFilters === 0) {
    find = await model.findAll({ 
      offset: offset, 
      limit: limit,
    });
  }else {
    find = await model.findAll({
      offset: offset,
      limit: limit,
      where: convertedFilters
    });
  }
  return {
    filters: filters,
    pagination: {page, limit},
    list: find
  }
}