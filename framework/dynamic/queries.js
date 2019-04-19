export default {
  generateQueriesSchema(moduleName) {
    return `
<<<<<<< HEAD
      role${moduleName}(id: Int, action: String,_id: String): ${moduleName}
      list${moduleName}(page: Int, limit: Int): [${moduleName}]
=======
      view${moduleName}(id: Int, action: String,_id: String): ${moduleName}
      list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
>>>>>>> 7e73aab02b163dc4b0b158a4879477aad3ac0452
    `
      // list${moduleName}(page: Int, limit: Int): [${moduleName}]
  }
}