import primaryKey from "./../../../framework/helpers/primaryKey";
import { primaryKeyType } from "./../../../framework/helpers/primaryKey";

let primaryKeyType2 = primaryKeyType.toLowerCase();

export default {
  createUserPermission: {
    user: `${primaryKeyType2}|required`,
    permission: `${primaryKeyType2}|required`
  },
  deleteUserPermission: {
    [primaryKey]: `${primaryKeyType2}|required`
  },
  updateUserPermission: {
    [primaryKey]: `${primaryKeyType2}|required`,
    user: `${primaryKeyType2}|required`,
    permission: `${primaryKeyType2}|required`
  },
  userPermission: {
    [primaryKey]: `${primaryKeyType2}|required`
  }
};
