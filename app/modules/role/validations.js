import Joi from "joi";
const {DIALECT} = process.env;

export default {
  createRole: function () {
    return Joi.object().keys({
      name: Joi.string().required()
    })
  }(),
  deleteRole: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required()
      });
    }else {
      return Joi.object().keys({
        id: Joi.number().required()
      });
    }
  }(),
  updateRole: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required()
      })
    }else {
      return Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required()
      })
    }
    
  }(),
  role: function () {
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