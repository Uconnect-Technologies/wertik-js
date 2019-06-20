import getIdName from "./../../../framework/helpers/getIdName";
const {dialect} = process.env;

export default {
  createRole: {
    name: "string|required",
  },
  deleteRole: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateRole: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    name: "string|required"
  },
  role: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  }
}