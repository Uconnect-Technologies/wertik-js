const {dialect} = process.env;
import getIdName from "./../../../framework/helpers/getIdName";

export default {
  createPermission: {
    action: "string|required"
  },
  deletePermission: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updatePermission: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    action: "string|required"
  },
  permission: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  }
}