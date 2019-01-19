import Joi from "joi";
export default {
  requestPasswordReset: Joi.object().keys({
    email: Joi.string().required(),
  }),
}