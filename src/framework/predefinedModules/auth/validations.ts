let Validator = require('validatorjs');
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey";

const {dialect} = process.env;

export default {
  twoFactorLogin: {
    email: "required|email"
  },
  loginWithAccessToken: {
    accessToken: "string|required",
    refreshToken: "string"
  },
  twoFactorLoginValidate: {
    twoFactorCode: "string|required"
  },
  signup: {
    email: "email|required",
    name: "string",
    referer: "string",
    password: "string|required|min:3",
    confirmPassword: "string|required|min:3"
  },
  activateAccount: {
    activationToken: "string|required",
  },
  viewUser: {
    [primaryKey]: `${primaryKeyType}|required`
  },
  login: {
    email: "string|required",
    password: "string|required"
  },
  refreshToken: {
    refreshToken: "string|required"
  }
}