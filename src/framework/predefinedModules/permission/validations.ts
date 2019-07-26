const {dialect} = process.env;
import primaryKey from "./../../../framework/helpers/primaryKey";

export default {
  createPermission: {
    name: "string|required",
    cant: "string|required",
    can: "string|required"
  },
  deletePermission: {
    [primaryKey]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updatePermission: {
    [primaryKey]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    name: "string|required",
    cant: "string|required",
    can: "string|required"
  },
  permission: {
    [primaryKey]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  }
}