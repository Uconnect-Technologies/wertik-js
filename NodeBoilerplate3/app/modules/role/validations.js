import Joi from "joi";
export default {
  createRole: Joi.object().keys({
    name: Joi.string().required()
  }),
  deleteRole: Joi.object().keys({
    id: Joi.number().required()
  }),
  updateRole: Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required()
  }),
  role: Joi.object().keys({
    id: Joi.number().required(),
  }),
}