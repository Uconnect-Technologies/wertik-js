import Joi from "joi";
const {DIALECT} = process.env;
import getIdName from "./../../../framework/helpers/getIdName";


export default {
  createUserPermission: {
    user: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    permission: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  deleteUserPermission: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateUserPermission: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    user: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    permission: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  userPermission: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  }
}