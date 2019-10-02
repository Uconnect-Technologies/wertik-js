let Sequelize = require("sequelize");

import parseMultipleValuesIntoArray from "./filters/parseMultipleValuesIntoArray";

const Op = Sequelize.Op;

/* http://docs.sequelizejs.com/manual/querying.html#operators */

export default async function(filters: any) {
  let f: any = {};
  filters.forEach((item: any) => {
    if (!f[item.column]) {
      f[item.column] = {};
      let parsedValue;
      let operator = item.operator.toLowerCase();

      if (operator == "and") {
        parsedValue = parseMultipleValuesIntoArray(item.value, " and ");
        f[item.column][Op.and] = parsedValue;
      } else if (operator == "eq" || operator == "equals" || operator == "=") {
        f[item.column][Op.eq] = item.value;
      } else if (operator == "or") {
        parsedValue = parseMultipleValuesIntoArray(item.value, " or ");
        f[item.column][Op.or] = parsedValue;
      } else if (operator == "gt" || operator == ">" || operator == "greater_than") {
        f[item.column][Op.gt] = item.value;
      } else if (operator == "lt" || operator == "<" || operator == "less_than") {
        f[item.column][Op.lt] = item.value;
      } else if (operator == "lte" || operator == "=<" || operator == "less_than_or_equals") {
        f[item.column][Op.lte] = item.value;
      } else if (operator == "gte" || operator == "=>" || operator == "greater_than_or_equals") {
        f[item.column][Op.gte] = item.value;
      } else if (operator == "between" || operator == "inlist") {
        parsedValue = parseMultipleValuesIntoArray(item.value, " between ");
        f[item.column][Op.between] = parsedValue;
      } else if (operator == "notbetween" || operator == "notinlist") {
        parsedValue = parseMultipleValuesIntoArray(item.value, " notBetween ");
        f[item.column][Op.notBetween] = parsedValue;
      } else if (operator == "in") {
        parsedValue = parseMultipleValuesIntoArray(item.value, " in ");
        f[item.column][Op.in] = parsedValue;
      } else if (operator == "notin") {
        parsedValue = parseMultipleValuesIntoArray(item.value, " notIn ");
        f[item.column][Op.in] = parsedValue;
      } else if (operator == "like") {
        f[item.column][Op.like] = item.value;
      } else if (operator == "includes") {
        f[item.column][Op.substring] = item.value;
      } else if (operator == "startswith") {
        f[item.column][Op.startsWith] = item.value;
      } else if (operator == "endswith") {
        f[item.column][Op.endsWith] = item.value;
      }
    }
  });
  return f;
}
