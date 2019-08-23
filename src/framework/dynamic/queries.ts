import primaryKey from "./../helpers/primaryKey";
import { primaryKeyType } from "./../helpers/primaryKey";

export default {
  generateQueriesSchema(moduleName: any) {
    return `
      view${moduleName}(${primaryKey}: ${primaryKeyType}): ${moduleName}
      list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `;
  }
};
