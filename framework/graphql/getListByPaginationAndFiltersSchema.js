export default function (moduleName) {
  return `
    type ${moduleName}List {
      list: [${moduleName}]
      pagination: Pagination
      filters: [Filter]
    }
  `;
}