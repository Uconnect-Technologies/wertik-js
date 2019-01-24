import Joi from "joi";
const {DIALECT} = process.env;
export default {
  requestPasswordReset: function () {
    return Joi.object().keys({
      email: Joi.string().email().required(),
    })
  }(),
  forgetPassword: function () {
    return Joi.object().keys({
      token: Joi.string().required(),
    })
  }(),
  resetPassword: function () {
    return Joi.object().keys({
      password: Joi.string().min(3).required(),
      confirmPassword: Joi.string().min(3).required(),
      token: Joi.string().required(),
    })
  }(),
}