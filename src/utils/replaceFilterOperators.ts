import { isPlainObject } from "lodash"
import sequelize from "sequelize"
const Op = sequelize.Op

const wrap = (operator: string) => {
  return Op[operator.replace("_", "")]
}

const iterate = (obj) => {
  if (isPlainObject(obj)) {
    Object.keys(obj).forEach((element) => {
      const value = obj[element]
      if (element.startsWith("_")) {
        const newElement = wrap(element)
        obj[newElement] = obj[element]
        delete obj[element]
      }
      if (isPlainObject(value) || Array.isArray(value)) {
        iterate(value)
      }
    })
    return obj
  } else if (Array.isArray(obj)) {
    obj.forEach((element) => iterate(element))
  }
}

export default iterate
