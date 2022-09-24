import isPlainObject from 'lodash.isplainobject'
import sequelize from 'sequelize'
const Op = sequelize.Op

const wrap = (operator: string): string => {
  return Op[operator.replace('_', '')]
}

const iterate = (obj: any): any => {
  const isObject = isPlainObject(obj)
  if (isObject) {
    const keys = Object.keys(obj)
    keys.forEach((element: string) => {
      const value = obj[element]
      const isArray = Array.isArray(value)
      const isObject = isPlainObject(value)
      if (element.startsWith('_')) {
        const newWrapValue = wrap(element)
        obj[newWrapValue] = obj[element]
        delete obj[element]
      }
      if (isArray || isObject === true) {
        iterate(value)
      }
    })
    return obj
  } else {
    obj.forEach &&
      obj.forEach((element) => {
        iterate(element)
      })
  }
}

export default iterate
