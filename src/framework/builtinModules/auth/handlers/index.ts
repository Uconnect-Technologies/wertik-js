let bcrypt = require("bcrypt-nodejs");
import moment from "moment";
import statusCodes from "./../../../../framework/helpers/statusCodes";
import createJwtToken from "./../../../../framework/security/createJwtToken";
import {ApolloError} from "apollo-server";
import {get} from "lodash";

export const signup = async function (obj) {
  const {userModel, data, emailTemplates, sendEmail} = obj;
  let { email, password, confirmPassword } = data;
  let user = await userModel.findOne({
      email: email
  });
  if (user) throw new ApolloError("Email is already used");
  var hash = bcrypt.hashSync(password);
  let newUser = await userModel.create({
      email: email,
      referer: get(data, "referer", ""),
      superUser: false,
      name: get(data, "name", ""),
      accessToken: await createJwtToken({
        email: email,
        for: "authentication"
      }),
      refreshToken: await createJwtToken({
        email: email,
        for: "refreshToken"
      }),
      isActivated: false,
      isSuperUser: get(data, "isSuperUser", false),
      activationToken:
        Math.random()
          .toString(36)
          .substring(2) +
        Math.random()
          .toString(36)
          .substring(2) +
        Math.random()
          .toString(36)
          .substring(2),
      password: hash
    });
  await sendEmail(
      emailTemplates.welcome,
      {
          email: newUser.email,
          username: newUser.email,
          date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
          siteName: process.env.name,
          activationUrl: `${process.env.frontendAppUrl}/activate-account/`,
          activationToken: newUser.activationToken
      },
      {
          from: process.env.mailerServiceUsername,
          to: newUser.email,
          subject: `Welcome to ${process.env.name}`
      }
  );
  return newUser;
}
export const login = async function (obj) {
  const {userModel, data} = obj;
  const { email, password } = data;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    throw new ApolloError("No User found with such email");
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    throw new ApolloError("Incorrect Password");
  }
  let token = await createJwtToken({
    email: email,
    for: "authentication"
  });
  await user.update({
    accessToken: token
  });
  return user;
}
export const twoFactorLogin = function (data) {

}
export const twoFactorLoginValidate = function (data) {

}
export const loginWithAccessToken = function (data) {

}
export const activateAccount = async function (obj) {
  const {userModel,emailTemplates,sendEmail,data} = obj;
  const {activationToken} = data;
  let user = await userModel.findOne({ activationToken:  activationToken});
  if (!user) {
    throw new ApolloError("No User found or account is already is activated.");
  }
  await user.update({
    isActivated: true,
    activationToken: ''
  });
  await sendEmail(
    emailTemplates.accountActivated,
    {
      username: user.email,
      siteName: process.env.name,
    },
    {
      from: process.env.mailerServiceUsername,
      to: user.email,
      subject: `Account activated ${process.env.name}`
    }
  );
  return user;
}
export const refreshToken = function (data) {

}
