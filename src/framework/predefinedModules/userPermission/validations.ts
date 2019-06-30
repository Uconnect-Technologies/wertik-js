const {dialect} = process.env;
import getIdName from "./../../../framework/helpers/getIdName";


export default {
  createUserPermission: {
    user: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    permission: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
  deleteUserPermission: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateUserPermission: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    user: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    permission: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
  userPermission: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  }
}