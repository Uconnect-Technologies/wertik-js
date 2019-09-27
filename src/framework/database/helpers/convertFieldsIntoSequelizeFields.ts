const sequelize = require("sequelize");
export default function (fields) {
  let k = Object.keys(fields);
  k.forEach(element => {
    const t = fields[element].type;
    fields[element].type = sequelize[t.toUpperCase()];
  });
  return fields;
}