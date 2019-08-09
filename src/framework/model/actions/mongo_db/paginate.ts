let { get } = require("lodash");
import convertFiltersArrayInToMongoFilter from "./../../../database/mongodb/convertFiltersArrayInToMongoFilter";

export default async function(model: any, args: any = {}, requestedFields: any) {
  let filters = get(args, "filters", []);
  let baseFields = Object.keys(requestedFields.list);
  let mongodbFilter = await convertFiltersArrayInToMongoFilter(filters);
  let pagination = get(args, "pagination", { page: 1, limit: 10 });
  const { page, limit } = pagination;
  let totalFilters = filters.length;
  let result = {};
  if (totalFilters > 0) {
    result = await model.paginate(mongodbFilter, {
      page: page,
      limit: limit,
      select: baseFields.join(" ")
    });
  } else {
    result = await model.paginate(
      {},
      {
        page: page,
        limit: limit,
        select: baseFields.join(" ")
      }
    );
  }
  const total = get(result, "total", 0);
  const response = get(result, "docs", []);
  return {
    filters: filters,
    pagination: pagination,
    list: response,
    paginationProperties: {
      total: total,
      page: page,
      nextPage: page + 1,
      previousPage: page == 1 ? 1 : page - 1,
      pages: Math.ceil(total / limit)
    }
  };
}
