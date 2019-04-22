import Joi from "joi";
const {DIALECT} = process.env;

export default {
  createPermission: Joi.object().keys({
    action: Joi.string().required()
  }),
  deletePermission: function () {
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
  updatePermission: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required(),
        action: Joi.string().required()
      });
    }else {
      return Joi.object().keys({
        id: Joi.number().required(),
        action: Joi.string().required()
      })
    }
  }(),
  permission: function () {
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