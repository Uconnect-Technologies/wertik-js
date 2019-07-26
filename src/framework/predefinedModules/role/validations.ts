import primaryKey from "./../../../framework/helpers/primaryKey";
import {primaryKeyType} from "./../../../framework/helpers/primaryKey";
const {dialect} = process.env;

let primaryKeyType2 = primaryKeyType.toLowerCase();

export default {
  createRole: {
    name: "string|required"
  },
  deleteRole: {
    [primaryKey]: `${primaryKeyType2}|required`
  },
  updateRole: {
    [primaryKey]: `${primaryKeyType2}|required`,
    name: "string|required"
  },
  role: {
    [primaryKey]: `${primaryKeyType2}|required`
  }
}