import { get } from "lodash";
import isAuthQuery from "./isAuthQuery";
import getUserWithAccessToken from "./getUserWithAccessToken";

export default async function(userModel, accessToken) {
  const token = accessToken.replace("bearer ", "");
  const user = await getUserWithAccessToken(userModel, token);
  if (user) {
    return user;
  } else {
    throw new Error("Access token expired");
  }
}
