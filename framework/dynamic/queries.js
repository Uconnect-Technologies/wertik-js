export default {
  generateQueriesSchema(moduleName) {
    return `
      role${moduleName}(id: Int, action: String,_id: String): ${moduleName}
      list${moduleName}(page: Int, limit: Int): [${moduleName}]
    `
  }
}