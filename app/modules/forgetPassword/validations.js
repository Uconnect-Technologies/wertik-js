import Joi from "joi";
const {DIALECT} = process.env;
export default {
  requestPasswordReset: {
    email: "email|required"
  },
  forgetPassword: {
    token: "string|required"
  },
  resetPassword: {
    password: "string|min:3|required",
    confirmPassword: "string|min:3|required",
    token: "string|required"
  }
}