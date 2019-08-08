export default function(moduleName: any) {
  return `
    type ${moduleName}List {
      list: [${moduleName}]
      pagination: Pagination
      filters: [Filter]
      paginationProperties: PaginationProperties
    }
  `;
}
