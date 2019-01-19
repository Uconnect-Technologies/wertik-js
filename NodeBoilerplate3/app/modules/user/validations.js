import Joi from "joi";
export default {
  signup: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().min(3).required()
  }),
  userView: Joi.object().keys({
    id: Joi.required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required()
  }),
  changePassword: Joi.object().keys({
    newPassword: Joi.string().min(3).required(),
    oldPassword: Joi.string().min(3).required(),
    userID: Joi.required(),
  }),
  updateProfile: Joi.object().keys({
    userID: Joi.number().required(),
    name: Joi.string().min(3).required(),
    age: Joi.number(),
    gender: Joi.string()
  })
}