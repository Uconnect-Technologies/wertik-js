"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dialect = process.env.dbDialect;
let action = dialect.toLowerCase();
let path = __dirname;
if (action == "postgres") {
    action = "mysql";
}
let create = require(`${path}/${action}/create`).default;
let paginate = require(`${path}/${action}/paginate`).default;
let update = require(`${path}/${action}/update`).default;
let view = require(`${path}/${action}/view`).default;
let destroy = require(`${path}/${action}/destroy`).default;
let findOne = require(`${path}/${action}/findOne`).default;
exports.default = {
    create,
    update,
    paginate,
    view,
    destroy,
    findOne
};
//# sourceMappingURL=index.js.map