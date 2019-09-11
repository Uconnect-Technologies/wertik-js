export default function(moduleName: String) {
  return `
    type ${moduleName}List {
      list: [${moduleName}]
      pagination: Pagination
      filters: [Filter]
      paginationProperties: PaginationProperties
    }
  `;
}
