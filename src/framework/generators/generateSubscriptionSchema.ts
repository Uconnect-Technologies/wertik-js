let { camelCase } = require("lodash");
export default function(moduleName: String) {
  return `
    ${camelCase(moduleName)}Deleted: ${moduleName}
    ${camelCase(moduleName)}Created: ${moduleName}
    ${camelCase(moduleName)}Updated: ${moduleName}
  `;
}
