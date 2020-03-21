let { get } = require("lodash");
import convertFiltersIntoSequalizeObject from "./../../../database/mysql/convertFiltersIntoSequalizeObject";

export default async function(model: any, args: any = {}, requestedFields: any = []) {
  let baseFields: any = "*";
  let attributesObject = {};

  if (requestedFields.constructor === Array) {
    baseFields = requestedFields;
    attributesObject["attributes"] = baseFields;
  }
  let sorting = get(args, "sorting", []);
  let sortingObject = {
    order: sorting.map(c => {
      return [c.column, c.type];
    })
  };
  let page = get(args, "pagination.page", 1);
  let limit = get(args, "pagination.limit", 10);
  let filters = get(args, "filters", []);
  let convertedFilters = await convertFiltersIntoSequalizeObject(filters);
  let offset = limit * (page - 1);
  let totalFilters = filters.length;
  let list: any = {};
  if (baseFields == "*") {
    delete attributesObject["attributes"];
  }
  if (sorting.length == 0) {
    delete sortingObject["sorting"];
  }
  if (totalFilters > 0) {
    list = await model.findAndCountAll({
      offset: offset,
      limit: limit,
      where: convertedFilters,
      ...attributesObject,
      ...sortingObject
    });
  } else {
    list = await model.findAndCountAll({
      offset: offset,
      limit: limit,
      ...attributesObject,
      ...sortingObject
    });
  }
  return {
    filters,
    pagination: { page, limit },
    list: list.rows,
    paginationProperties: {
      total: list.count,
      nextPage: page + 1,
      page: page,
      previousPage: page == 1 ? 1 : page - 1,
      pages: Math.ceil(list.count / limit)
    }
  };
}
