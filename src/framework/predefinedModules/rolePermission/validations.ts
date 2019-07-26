const {dialect} = process.env;

import primaryKey from "./../../../framework/helpers/primaryKey";
import {primaryKeyType} from "./../../../framework/helpers/primaryKey";

let primaryKeyType2 = primaryKeyType.toLowerCase(); 

export default {
  createRolePermission: {
    role: `${primaryKeyType2}|required`,
    permission: `${primaryKeyType2}|required`
  },
  deleteRolePermission: {
    [primaryKey]: `${primaryKeyType2}|required`
  },
  updateRolePermission: {
    [primaryKey]: `${primaryKeyType2}|required`,
    role: `${primaryKeyType2}|required`,
    permission: `${primaryKeyType2}|required`
  },
  rolePermission:  {
    [primaryKey]: `${primaryKeyType2}|required`
  }
}