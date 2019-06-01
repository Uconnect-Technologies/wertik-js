import Joi from "joi";
const {DIALECT} = process.env;
import getIdName from "./../../../framework/helpers/getIdName";

export default {
  createUserRole: {
    user: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required", 
    role: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required", 
  },
  deleteUserRole: {
   [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required", 
  },
  updateUserRole: {
    user: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required", 
    role: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required", 
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required", 
  },
  userRole: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
}