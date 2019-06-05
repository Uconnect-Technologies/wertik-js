import getIdName from "./../../../framework/helpers/getIdName";
const {DIALECT} = process.env;

export default {
  createProfile: {
    user: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    description: "string|required"
  },
  deleteProfile: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateProfile: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
    description: "string"
  },
  profile: {
    [getIdName]: (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
  }
}