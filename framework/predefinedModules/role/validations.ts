import getIdName from "./../../../framework/helpers/getIdName";
const {DIALECT} = process.env;

export default {
  createRole: {
    name: "string|required",
  },
  deleteRole: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateRole: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    name: "string|required"
  },
  role: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  }
}