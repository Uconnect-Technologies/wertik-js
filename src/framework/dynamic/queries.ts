export default {
  generateQueriesSchema(moduleName: any) {
    return `
      view${moduleName}(id: Int, action: String,_id: String): ${moduleName}
      list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `
  }
}