import getIdName from "./../helpers/getIdName";
import {getIdType} from "./../helpers/getIdName";

const { dialect } = process.env;

export default {
  generateQueriesSchema(moduleName: any) {
    return `
      view${moduleName}(${getIdName}: ${getIdType}): ${moduleName}
      list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `
  }
}