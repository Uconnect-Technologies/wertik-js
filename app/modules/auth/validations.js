import Joi from "joi";

const {DIALECT} = process.env;

export default {
  twoFactorLogin: Joi.object().keys({
    email: Joi.string().required()
  }),
  loginWithAccessToken: Joi.object().keys({
    accessToken: Joi.string().required(),
    refreshToken: Joi.string().allow('').optional()
  }),
  twoFactorLoginValidate: Joi.object().keys({
    twoFactorCode: Joi.string().required()
  }),
  signup: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().allow('').optional(),
    referer: Joi.allow('').optional(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().min(3).required()
  }),
  activateAccount: function () {
    return Joi.object().keys({
      activationToken: Joi.string().required(),
    })
  }(),
  viewUser: function () {
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
}