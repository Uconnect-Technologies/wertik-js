const {dialect} = process.env;
import primaryKey from "./../../../framework/helpers/primaryKey";
import { primaryKeyType} from "./../../../framework/helpers/primaryKey";

let primaryKeyType2 = primaryKeyType.toLowerCase();

export default {
  createUserRole: {
    user: `${primaryKeyType2}|required`,
    role: `${primaryKeyType2}|required`,
  },
  deleteUserRole: {
    [primaryKey]: `${primaryKeyType2}|required`,
  },
  updateUserRole: {
    user: `${primaryKeyType2}|required`,
    role: `${primaryKeyType2}|required`,
    [primaryKey]: `${primaryKeyType2}|required`,
  },
  userRole: {
    [primaryKey]: `${primaryKeyType2}|required`,
  },
}