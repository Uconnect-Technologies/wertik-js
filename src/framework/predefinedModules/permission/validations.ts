const { dialect } = process.env;
import primaryKey from "./../../../framework/helpers/primaryKey";
import {primaryKeyType} from "./../../../framework/helpers/primaryKey";

export default {
  createPermission: {
    name: "string|required",
    can: "string|required",
    cant: "string"
  },
  deletePermission: {
    [primaryKey]: `${primaryKeyType2}|required`
  },
  updatePermission: {
    [primaryKey]: `${primaryKeyType2}|required`,
    name: "string|required",
    can: "string|required",
    cant: "string"
  },
  permission: {
    [primaryKey]: `${primaryKeyType2}|required`
  }
};
