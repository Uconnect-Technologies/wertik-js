import Joi from "joi";
export default {
  createRolePermission: Joi.object().keys({
    role: Joi.number().required(),
    permission: Joi.number().required()
  }),
  deleteRolePermission: Joi.object().keys({
    id: Joi.number().required()
  }),
  updateRolePermission: Joi.object().keys({
    id: Joi.number().required(),
    role: Joi.number().required(),
    permission: Joi.number().required()
  }),
  rolePermission: Joi.object().keys({
    id: Joi.number().required(),
  }),
}