const sequelize = require("sequelize")

export const convertFieldsIntoSequelizeFields = (fields) => {
  let k = Object.keys(fields)
  k.forEach((element) => {
    let t = fields[element].type
    if (t.toLowerCase() === "number") {
      t = "integer"
    }
    fields[element].type = sequelize[t.toUpperCase()]
    fields[element].oldType = t
  })
  return fields
}
