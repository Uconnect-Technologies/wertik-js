import Joi from "joi";
const {DIALECT} = process.env;

export default {
  createUserRole: function () {
    return Joi.object().keys({
      user: Joi.number().required(),
      role: Joi.number().required(),
    })
  }(),
  deleteUserRole: function () {
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
  updateUserRole: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required(),
        user: Joi.number().required(),
        role: Joi.number().required(),
      });
    }else {
      return Joi.object().keys({
        id: Joi.number().required(),
        user: Joi.number().required(),
        role: Joi.number().required(),
      });
    }
   
  }(),
  userRole: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required(),
      });
    }else {
      return Joi.object().keys({
        id: Joi.number().required(),
      });
    }
  }(),
}