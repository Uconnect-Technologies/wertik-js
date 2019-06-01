import convertFiltersArrayInToMongoFilter from "./../../../database/mongodb/convertFiltersArrayInToMongoFilter.ts";
import {get} from "lodash";
export default async function (model,args = {}) {
  let filters = get(args,'filters',[]);
  let mongodbFilter = await convertFiltersArrayInToMongoFilter(filters);
  let pagination = get(args,'pagination',{page: 1, limit: 10});
  const {page, limit} = pagination;
  let totalFilters = filters.length;
  let result = {};
  if (totalFilters > 0) {
  	result = await model.paginate(mongodbFilter,{page: page,limit: limit})
  }else {
  	result = await model.paginate({},{page: page,limit: limit})
  }
  const response = get(result,'docs',[]);
  return {
    filters: filters,
    pagination: pagination,
    list: response
  }
}