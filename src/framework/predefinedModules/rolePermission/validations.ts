const {dialect} = process.env;
import getIdName from "./../../../framework/helpers/getIdName";

export default {
  createRolePermission: {
    role: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    permission: (dialect == "MONGO_DB") ? "string|required" : "integer|required"
  },
  deleteRolePermission: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateRolePermission: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    role: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    permission: (dialect == "MONGO_DB") ? "string|required" : "integer|required"
  },
  rolePermission:  {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  }
}