import Joi from "joi";
import Validator from 'validatorjs';
import getIdName from "./../../../framework/helpers/getIdName.js";

const {DIALECT} = process.env;

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
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  login: {
    email: "string|required",
    password: "string|required"
  },
  refreshToken: {
    refreshToken: "string|required"
  }
}