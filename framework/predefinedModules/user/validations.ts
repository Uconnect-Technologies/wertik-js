import Joi from "joi";
import getIdName from "./../../../framework/helpers/getIdName.ts";

const {DIALECT} = process.env;

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
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  changePassword: {
    oldPassword: "string|min:3|required",
    newPassword: "string|min:3|required",
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  deleteUser: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateUser: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    name: "string|min:3",
    email: "string",
    age: "integer",
    gender: "integer",
    isSuperUser: "boolean"
  },
}