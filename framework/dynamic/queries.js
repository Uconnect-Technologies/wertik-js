export default {
  generateQueriesSchema(moduleName,schema) {
    return `
      role${moduleName}(id: Int, action: String,_id: String): ${schema}
      list${moduleName}(page: Int, limit: Int): [${schema}]
    `
  }
}