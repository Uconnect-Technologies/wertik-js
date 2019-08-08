import internalServerError from "./../helpers/internalServerError";
import getUserWithAccessToken from "./getUserWithAccessToken";
import { get } from "lodash";
import isAuthQuery from "./isAuthQuery";
export default async function({ req, res }) {
  const query = get(req, "body.query", "");
  const isAuth = isAuthQuery(query);
  if (isAuth) {
    return {};
  }
  let token = get(req, "headers.authorization", false);
  token = token.replace("bearer ", "");
  if (token === false) {
    throw internalServerError({ message: "Unauthorized, Reason: Missing auth token" }, 401);
  }
  let user = await getUserWithAccessToken(token);
  if (!user) {
    throw internalServerError({ message: "Unauthorized, You need to signin." }, 401);
  }
  return {
    user
  };
}
