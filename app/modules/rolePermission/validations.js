import Joi from "joi";
const {DIALECT} = process.env;
export default {
  createRolePermission: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        role: Joi.string().required(),
        permission: Joi.string().required()
      })
    }else {
      return Joi.object().keys({
        role: Joi.number().required(),
        permission: Joi.number().required()
      })
    }
  }(),
  deleteRolePermission: function () {
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
  updateRolePermission: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        _id: Joi.string().required(),
        role: Joi.string().required(),
        permission: Joi.string().required()
      });
    }else {
       return Joi.object().keys({
        id: Joi.number().required(),
        role: Joi.number().required(),
        permission: Joi.number().required()
      });     
    }
  }(),
  rolePermission: function () {
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