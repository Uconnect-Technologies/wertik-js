let {get} = require("lodash");
import convertFiltersIntoSequalizeObject from "./../../../database/mysql/convertFiltersIntoSequalizeObject";

export default async function (model: any,args: any = {}) {
  let pagination = get(args,'pagination',{page: 1, limit: 10});
  const {page, limit} = pagination;
  let filters = get(args,'filters',[]);
  let convertedFilters = await convertFiltersIntoSequalizeObject(filters);
  let data = await model.findAndCountAll();
  let pages = Math.ceil(data.count / limit);
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
    pagination,
    list: find
  }
}