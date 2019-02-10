import Joi from "joi";
const {DIALECT} = process.env;
export default {
  createProfile: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        user: Joi.string().required(),
        description: Joi.string().allow().optional()
      })
    }else {
      return Joi.object().keys({
        user: Joi.number().required(),
        description: Joi.string().allow().optional()
      })
    }
  }(),
  deleteProfile: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required()
      })
    }else {
      return Joi.object().keys({
        id: Joi.number().required()
      })
    }
  }(),
  updateProfile: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required(),
        description: Joi.string().allow().optional()
      });
    }else {
      return Joi.object().keys({
        id: Joi.number().required(),
        description: Joi.string().allow().optional()
      })
    }
  }(),
  profile: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required(),
      })
    }else {
      return Joi.object().keys({
        id: Joi.number().required(),
      })
    }
  }(),
}