import Joi from "joi";
export default {
  createPermission: Joi.object().keys({
    action: Joi.string().required()
  }),
  deletePermission: Joi.object().keys({
    id: Joi.number().required()
  }),
  updatePermission: Joi.object().keys({
    id: Joi.number().required(),
    action: Joi.string().required()
  }),
  permission: Joi.object().keys({
    id: Joi.number().required(),
  }),
}