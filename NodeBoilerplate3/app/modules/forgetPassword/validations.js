import Joi from "joi";
export default {
  requestPasswordReset: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
  forgetPassword: Joi.object().keys({
    token: Joi.string().required(),
  }),
  resetPassword: Joi.object().keys({
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().min(3).required(),
    token: Joi.string().required(),
  }),
}