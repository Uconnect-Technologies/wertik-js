const dialect = process.env.DIALECT;
let action = dialect.toLowerCase();
let path = __dirname;
let create = require(`${path}/${action}/create.ts`).default;
let paginate = require(`${path}/${action}/paginate.ts`).default;
let update = require(`${path}/${action}/update.ts`).default;
let view = require(`${path}/${action}/view.ts`).default;
let destroy = require(`${path}/${action}/destroy.ts`).default;
let findOne = require(`${path}/${action}/findOne.ts`).default;


export default {
  create,
  update,
  paginate,
  view,
  destroy,
  findOne
}