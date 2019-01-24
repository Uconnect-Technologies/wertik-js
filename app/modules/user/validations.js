import Joi from "joi";

const {DIALECT} = process.env;

export default {
  signup: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().min(3).required()
  }),
  userView: function () {
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
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required()
  }),
  changePassword: function () {
    if (DIALECT == "MONGO_DB") {
      return Joi.object().keys({
        newPassword: Joi.string().min(3).required(),
        oldPassword: Joi.string().min(3).required(),
        _id: Joi.string().required(),
      })
    }else {
      return Joi.object().keys({
        newPassword: Joi.string().min(3).required(),
        oldPassword: Joi.string().min(3).required(),
        id: Joi.number().required(),
      })
    }
  }(),
  updateProfile: Joi.object().keys({
    userID: Joi.number().required(),
    name: Joi.string().min(3).required(),
    age: Joi.number(),
    gender: Joi.string()
  })
}