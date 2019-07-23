let {get} = require("lodash");
import convertFiltersIntoSequalizeObject from "./../../../database/mysql/convertFiltersIntoSequalizeObject";

export default async function (model: any,args: any = {},requestedFields: any = []) {
  let baseFields = Object.keys(requestedFields.list);
  let page = get(args,'pagination.page',1);
  let limit = get(args,'pagination.limit',10);
  let filters = get(args,'filters',[]);
  let convertedFilters = await convertFiltersIntoSequalizeObject(filters);
  let offset = limit * (page - 1);
  let totalFilters = filters.length;
  let list = [];
  if (totalFilters > 0) {
    list = await model.findAll({
      offset: offset,
      limit: limit,
      where: convertedFilters,
      attributes: baseFields
    });
  }else {
    list = await model.findAll({ 
      offset: offset, 
      attributes: baseFields,
      limit: limit,
    });
  }
  return {
    filters,
    pagination: {page, limit},
    list
  }
}