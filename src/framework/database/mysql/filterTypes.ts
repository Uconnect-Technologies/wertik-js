let Sequelize = require("sequelize");
const op = Sequelize.Op;

export let types = [
  "equals",
  "not_equals",
  "in_list",
  "not_in_list",
  "starts_with",
  "between",
  "not_between",
  "greater_than",
  "less_than",
  "less_than_equals",
  "greater_than_equals"
];

export let typeValues = {
  equals: op.eq,
  not_equals: op.ne,
  in_list: op.in,
  not_in_list: op.notIn,
  starts_with: op.startsWith,
  between: op.between,
  not_between: op.notBetween,
  greater_than: op.ge,
  less_than: op.le,
  less_than_equals: op.lte,
  greater_than_equals: op.gte
};
