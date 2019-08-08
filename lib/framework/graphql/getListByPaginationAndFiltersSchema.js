"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(moduleName) {
  return `
    type ${moduleName}List {
      list: [${moduleName}]
      pagination: Pagination
      filters: [Filter]
      paginationProperties: PaginationProperties
    }
  `;
}
exports.default = default_1;
//# sourceMappingURL=getListByPaginationAndFiltersSchema.js.map
