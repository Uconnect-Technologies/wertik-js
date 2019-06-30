"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { camelCase } = require("lodash");
exports.default = {
    generateSubscriptionsSchema(module) {
        return `
      ${camelCase(module)}Deleted: ${module}
      ${camelCase(module)}Created: ${module}
      ${camelCase(module)}Updated: ${module}
    `;
    }
};
//# sourceMappingURL=subscriptions.js.map