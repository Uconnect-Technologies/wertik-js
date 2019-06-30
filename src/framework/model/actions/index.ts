const dialect = process.env.dialect;
let action = dialect.toLowerCase();
let path = __dirname;
let create = require(`${path}/${action}/create`).default;
let paginate = require(`${path}/${action}/paginate`).default;
let update = require(`${path}/${action}/update`).default;
let view = require(`${path}/${action}/view`).default;
let destroy = require(`${path}/${action}/destroy`).default;
let findOne = require(`${path}/${action}/findOne`).default;


export default {
  create,
  update,
  paginate,
  view,
  destroy,
  findOne
}