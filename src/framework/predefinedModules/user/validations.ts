import primaryKey from "./../../../framework/helpers/primaryKey";
import {primaryKeyType} from "./../../../framework/helpers/primaryKey";

let primaryKeyType2 = primaryKeyType.toLowerCase();

export default {
  twoFactorLogin: {
    email: "email|required"
  },
  loginWithAccessToken: {
    accessToken: "string|required",
    refreshToken: "string",
  },
  twoFactorLoginValidate: {
    twoFactorCode: "string|required"
  },
  signup: {
    email: "email|required",
    name: "string",
    referer: "string",
    password: "string|min:3|required",
    confirmPassword: "string|min:3|required"
  },
  activateAccount: {
    activationToken: "string|required"
  },
  viewUser: {
    [primaryKey]: `${primaryKeyType2}|required`,
  },
  changePassword: {
    oldPassword: "string|min:3|required",
    newPassword: "string|min:3|required",
    [primaryKey]: `${primaryKeyType2}|required`,
  },
  deleteUser: {
    [primaryKey]: `${primaryKeyType2}|required`,
  },
  updateUser: {
    [primaryKey]: `${primaryKeyType2}|required`,
    name: "string|min:3",
    email: "string",
    age: "integer",
    gender: "integer",
    isSuperUser: "boolean"
  },
}