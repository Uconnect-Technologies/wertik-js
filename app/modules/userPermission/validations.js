import Joi from "joi";
const {DIALECT} = process.env;
export default {
  createUserPermission: function () {
    return Joi.object().keys({
      user: Joi.number().required(),
      permission: Joi.number().required()
    })
  }(),
  deleteUserPermission: function () {
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
  updateUserPermission: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required(),
        user: Joi.number().required(),
        permission: Joi.number().required()
      });
    }else {
       return Joi.object().keys({
        id: Joi.number().required(),
        user: Joi.number().required(),
        permission: Joi.number().required()
      });     
    }
  }(),
  userPermission: function () {
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