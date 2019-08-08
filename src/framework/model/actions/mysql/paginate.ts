let { get } = require("lodash");
import convertFiltersIntoSequalizeObject from "./../../../database/mysql/convertFiltersIntoSequalizeObject";

export default async function(model: any, args: any = {}, requestedFields: any = []) {
  let baseFields: any = "*";
  let attributesObject = {};
  if (requestedFields.constructor === Object) {
    baseFields = Object.keys(requestedFields.list);
    attributesObject["attributes"] = baseFields;
  }
  let page = get(args, "pagination.page", 1);
  let limit = get(args, "pagination.limit", 10);
  let filters = get(args, "filters", []);
  let convertedFilters = await convertFiltersIntoSequalizeObject(filters);
  let offset = limit * (page - 1);
  let totalFilters = filters.length;
  let list: any = {};
  if (baseFields) {
    delete attributesObject["attributes"];
  }
  if (totalFilters > 0) {
    list = await model.findAndCountAll({
      offset: offset,
      limit: limit,
      where: convertedFilters,
      ...attributesObject
    });
  } else {
    list = await model.findAndCountAll({
      offset: offset,
      limit: limit,
      ...attributesObject
    });
  }
  return {
    filters,
    pagination: { page, limit },
    list: list.rows,
    paginationProperties: {
      total: list.count,
      nextPage: page + 1,
      previousPage: page == 1 ? 1 : page - 1,
      pages: Math.ceil(list.count / limit)
    }
  };
}
