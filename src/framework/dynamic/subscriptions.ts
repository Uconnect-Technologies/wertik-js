let { camelCase } = require("lodash");
export default {
  generateSubscriptionsSchema(module: string) {
    return `
      ${camelCase(module)}Deleted: ${module}
      ${camelCase(module)}Created: ${module}
      ${camelCase(module)}Updated: ${module}
    `
  }
}