import Joi from "joi";
import getErrors from "./getErrors.js";

export default async function (schema,args) {
  try {
    let v = await Joi.validate(args,schema);
    return {success: true}
  } catch (e) {
    return {success: false, errors: getErrors(e.details)};
  }
}