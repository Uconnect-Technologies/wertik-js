const dialect = process.env.DIALECT;
let action = dialect.toLowerCase();
let path = __dirname;
let create = require(`${path}/${action}/create.js`).default;
let paginate = require(`${path}/${action}/paginate.js`).default;
let update = require(`${path}/${action}/update.js`).default;
let view = require(`${path}/${action}/view.js`).default;
let destroy = require(`${path}/${action}/destroy.js`).default;
let findOne = require(`${path}/${action}/findOne.js`).default;


export default {
  create,
  update,
  paginate,
  view,
  destroy,
  findOne
}