import Joi from "joi";
const {DIALECT} = process.env;
import getIdName from "./../../../framework/helpers/getIdName.js";

export default {
  createRolePermission: {
    role: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    permission: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required"
  },
  deleteRolePermission: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateRolePermission: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    role: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    permission: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required"
  },
  rolePermission:  {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  }
}