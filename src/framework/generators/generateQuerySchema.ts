import primaryKey, { primaryKeyType } from "./../helpers/primaryKey";

export default function(moduleName) {
  return `
    view${moduleName}(${primaryKey}: ${primaryKeyType}): ${moduleName}
    list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
  `;
}
