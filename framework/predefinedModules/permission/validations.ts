const {DIALECT} = process.env;
import getIdName from "./../../../framework/helpers/getIdName";

export default {
  createPermission: {
    action: "string|required"
  },
  deletePermission: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updatePermission: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    action: "string|required"
  },
  permission: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  }
}