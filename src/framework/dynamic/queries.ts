import getIdName from "./../helpers/getIdName";

const { dialect } = process.env;

console.log(getIdName);

export default {
  generateQueriesSchema(moduleName: any) {
    return `
      view${moduleName}(${getIdName}: ${(dialect == "MONGO_db") ? "String" : "Int" }): ${moduleName}
      list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `
  }
}