import getIdName from "./../../../framework/helpers/getIdName";
const {dialect} = process.env;

export default {
  createProfile: {
    user: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    description: "string|required"
  },
  deleteProfile: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  },
  updateProfile: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    description: "string"
  },
  profile: {
    [getIdName]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
  }
}