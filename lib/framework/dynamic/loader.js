"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(moduleName, graphql) {
    let { mutations, queries } = graphql;
    return {
        subscriptions: graphql.subscriptions,
        queries: {
            [`list${moduleName}`]: queries[`list${moduleName}`],
            [`view${moduleName}`]: queries[`view${moduleName}`]
        },
        mutations: {
            [`create${moduleName}`]: mutations[`create${moduleName}`],
            [`delete${moduleName}`]: mutations[`delete${moduleName}`],
            [`update${moduleName}`]: mutations[`update${moduleName}`],
            [`updateBulk${moduleName}`]: mutations[`updateBulk${moduleName}`],
            [`createBulk${moduleName}`]: mutations[`createBulk${moduleName}`],
            [`deleteBulk${moduleName}`]: mutations[`deleteBulk${moduleName}`]
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=loader.js.map