import { ApolloError } from "apollo-server";
import createJwtToken from "./../../../security/createJwtToken";
import { randomString } from "./../../../helpers/index";
import moment from "moment";
import { generateHashPassword } from "../../../helpers/auth";

export const requestPasswordResetHandler = async function(obj) {
  const { userModel, forgetPasswordModel, data, emailTemplates, sendEmail } = obj;
  let user = await userModel.findOneByArgs({
    email: data.email
  });
  if (!user.instance) throw new ApolloError("No User found with such email.");
  let forgetPassword = await forgetPasswordModel.findOneByArgs({
    email: data.email
  });
  if (forgetPassword.instance) {
    await forgetPassword.delete();
  }
  let token = randomString(24, "MYNAMEISILYASKARIMANDIVETHESENUMBERS123456789");
  await forgetPasswordModel.create({
    token: token,
    email: user.instance.email,
    user: user.instance.id,
    expiresIn: moment()
      .add(30, "m")
      .unix()
  });
  await sendEmail(
    emailTemplates.requestPasswordReset,
    {
      email: user.instance.email,
      nextMinutes: moment()
        .add(30, "m")
        .format("LLLL"),
      token: token,
      siteName: process.env.name,
      frontendAppPasswordResetUrl: process.env.frontendAppPasswordResetUrl
    },
    {
      from: process.env.mailerServiceUsername,
      to: user.instance.email,
      subject: `Reset Password`
    }
  );
  return {
    message: "Please check your email"
  };
};

export const resetPasswordHandler = async function(obj) {
  const { userModel, forgetPasswordModel, data } = obj;
  const { token, password, confirmPassword } = data;
  let forgetPassword = await forgetPasswordModel.findOneByArgs({
    token: token
  });
  if (!forgetPassword.instance) throw new ApolloError("Token mismatch or already used.");
  let user = await userModel.findOneByArgs({
    email: forgetPassword.instance.email
  });
  if (!user.instance) throw new ApolloError("User not found");
  const hash = generateHashPassword(password);
  await user.update({
    password: hash
  });
  await forgetPassword.delete();
  return {
    message: "Password changed"
  };
};
