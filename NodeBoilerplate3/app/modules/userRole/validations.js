import Joi from "joi";
export default {
  createUserRole: Joi.object().keys({
    user: Joi.number().required(),
    role: Joi.number().required(),
  }),
  deleteUserRole: Joi.object().keys({
    id: Joi.number().required()
  }),
  updateUserRole: Joi.object().keys({
    id: Joi.number().required(),
    user: Joi.number().required(),
    role: Joi.number().required(),
  }),
  userRole: Joi.object().keys({
    id: Joi.number().required(),
  }),
}