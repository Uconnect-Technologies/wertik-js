import { isPlainObject } from "lodash";
import sequelize from "sequelize";
const Op = sequelize.Op;

const wrap = (operator) => {
  return Op[operator.replace("_", "")];
};

const iterate = (obj) => {
  const isObject = isPlainObject(obj);
  const isArray = Array.isArray(obj);
  if (isObject) {
    const keys = Object.keys(obj);
    keys.forEach((element) => {
      const value = obj[element];
      const isArray = Array.isArray(value);
      const isObject = isPlainObject(value);
      if (element.indexOf("_") === 0) {
        const newWrapValue = wrap(element);
        obj[newWrapValue] = obj[element];
        delete obj[element];
      }
      if (isArray === true || isObject === true) {
        iterate(value);
      }
    });
    return obj;
  } else {
    obj.forEach &&
      obj.forEach((element) => {
        iterate(element);
      });
  }
};

export default iterate;
