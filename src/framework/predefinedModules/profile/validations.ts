import primaryKey from "./../../../framework/helpers/primaryKey";
import {primaryKeyType} from "./../../../framework/helpers/primaryKey";

let primaryKeyType2 = primaryKeyType.toLowerCase();

export default {
  createProfile: {
    user: `${primaryKeyType2}|required`,
    description: "string|required"
  },
  deleteProfile: {
    [primaryKey]: `${primaryKeyType2}|required`,
  },
  updateProfile: {
    [primaryKey]: `${primaryKeyType2}|required`,
    description: "string"
  },
  profile: {
    [primaryKey]: `${primaryKeyType2}|required`,
  }
}