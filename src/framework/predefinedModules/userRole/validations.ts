const {dialect} = process.env;
import getIdName from "./../../../framework/helpers/getIdName";

export default {
  createUserRole: {
    user: (dialect == "MONGO_DB") ? "string|required" : "integer|required", 
    role: (dialect == "MONGO_DB") ? "string|required" : "integer|required", 
  },
  deleteUserRole: {
   [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required", 
  },
  updateUserRole: {
    user: (dialect == "MONGO_DB") ? "string|required" : "integer|required", 
    role: (dialect == "MONGO_DB") ? "string|required" : "integer|required", 
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required", 
  },
  userRole: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
}