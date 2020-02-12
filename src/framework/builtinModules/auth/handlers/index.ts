import moment from "moment";
import statusCodes from "./../../../../framework/helpers/statusCodes";
import createJwtToken from "./../../../../framework/security/createJwtToken";
import { ApolloError } from "apollo-server";
import { verifyPassword, generateHashPassword } from "./../../../../framework/helpers/index";
import { get } from "lodash";

export const signup = async function(obj) {
  const { userModel, data, emailTemplates, sendEmail } = obj;
  let { email, password, confirmPassword, ...restData } = data;
  if (password !== confirmPassword) throw new ApolloError("Passwords doesn't match.");
  let user = await userModel.findOneByArgs({
    email: email
  });
  if (user.instance) throw new ApolloError("Email is already used");
  var hash = generateHashPassword(password);
  let newUser = await userModel.create({
    email: email,
    referer: get(data, "referer", ""),
    superUser: false,
    name: get(data, "name", ""),
    accessToken: await createJwtToken({
      email: email,
      for: "authentication",
      expiresIn: moment()
        .add(5, "days")
        .unix()
    }),
    refreshToken: await createJwtToken({
      email: email,
      for: "refreshToken",
      expiresIn: moment()
        .add(5, "days")
        .unix()
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
    password: hash,
    ...restData
  });
  let userInstance = newUser.instance;
  await sendEmail(
    emailTemplates.welcome,
    {
      email: newUser.instance.email,
      username: newUser.instance.email,
      date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      siteName: process.env.name,
      activationUrl: `${process.env.frontendAppUrl}/activate-account/`,
      activationToken: newUser.instance.activationToken
    },
    {
      from: process.env.mailerServiceUsername,
      to: newUser.instance.email,
      subject: `Welcome to ${process.env.name}`
    }
  );
  return userInstance;
};
export const login = async function(obj, NoUserFoundMessage: string = '"No User found with such email"') {
  const { userModel, data } = obj;
  const { email, password } = data;
  const restArgs = get(data, "restArgs", {});
  let user = await userModel.findOneByArgs({
    email: email,
    ...restArgs
  });
  if (!user.instance) {
    throw new ApolloError(NoUserFoundMessage);
  }
  let comparePassword = await verifyPassword(password, user.instance.password);
  if (!comparePassword) {
    throw new ApolloError("Incorrect Password");
  }
  let token = await createJwtToken({
    email: email,
    for: "authentication",
    expiresIn: moment()
      .add(5, "days")
      .unix()
  });
  await user.update({
    accessToken: token
  });
  return user.instance;
};
export const twoFactorLogin = async function(obj) {
  const { userModel, emailTemplates, sendEmail, data } = obj;
  const { email } = data;
  let user = await userModel.findOneByArgs({ email: email });
  if (!user.instance) {
    throw new ApolloError("Incorrect email.");
  }
  const twoFactorCode = `Code-` + Math.floor(Math.random() * 60000 + 5000);
  user = await user.update({
    twoFactorCode: twoFactorCode
  });
  let userInstance = user.instance;
  await sendEmail(
    emailTemplates.twoFactorLogin,
    {
      username: user.instance.email,
      siteName: process.env.name,
      twoFactorCode: twoFactorCode
    },
    {
      from: process.env.mailerServiceUsername,
      to: user.instance.email,
      subject: `${twoFactorCode} is your authentication number - ${process.env.name}`
    }
  );
  return {
    message: `A code has been sent to your email which is ${userInstance.email}`
  };
};
export const twoFactorLoginValidate = async function(obj) {
  const { userModel, data } = obj;
  const { twoFactorCode } = data;
  let user = await userModel.findOneByArgs({ twoFactorCode: twoFactorCode });
  if (!user.instance) {
    throw new ApolloError("Incorrect twoFactorCode or already used.");
  }
  user = await user.update({
    twoFactorCode: "",
    accessToken: await createJwtToken({
      email: user.instance.email,
      for: "authentication"
    }),
    refreshToken: await createJwtToken({
      email: user.instance.email,
      for: "authentication"
    })
  });
  return user.instance;
};
export const loginWithAccessToken = async function(obj) {
  const { userModel, data } = obj;
  const { accessToken } = data;
  let user = await userModel.findOneByArgs({ accessToken: accessToken });
  if (!user.instance) {
    throw new ApolloError("Access token is missing.");
  }
  user = await user.update({
    accessToken: await createJwtToken({
      email: user.instance.email,
      for: "authentication"
    }),
    refreshToken: await createJwtToken({
      email: user.instance.email,
      for: "authentication"
    })
  });
  return user.instance;
};
export const activateAccount = async function(obj) {
  const { userModel, emailTemplates, sendEmail, data } = obj;
  const { activationToken } = data;
  let user = await userModel.findOneByArgs({ activationToken: activationToken });
  if (!user.instance) {
    throw new ApolloError("No User found or account is already is activated.");
  }
  user = await user.update({
    isActivated: true,
    activationToken: ""
  });
  let userInstance = user.instance;
  await sendEmail(
    emailTemplates.accountActivated,
    {
      username: user.instance.email,
      siteName: process.env.name
    },
    {
      from: process.env.mailerServiceUsername,
      to: user.instance.email,
      subject: `Account activated ${process.env.name}`
    }
  );
  return userInstance;
};
export const refreshTokenHandler = async function(obj) {
  const { userModel, data } = obj;
  const { refreshToken } = data;
  let user = await userModel.findOneByArgs({ refreshToken: refreshToken });
  if (!user.instance) {
    throw new ApolloError("Unauthorized, Missing refresh token.");
  }
  user = await user.update({
    accessToken: await createJwtToken({
      email: user.instance.email,
      for: "authentication"
    }),
    refreshToken: await createJwtToken({
      email: user.instance.email,
      for: "authentication"
    })
  });
  return user.instance;
};
