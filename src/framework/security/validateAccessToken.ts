import internalServerError from "./../helpers/internalServerError";
import getUserWithAccessToken from "./getUserWithAccessToken";
import { get } from "lodash";
import isAuthQuery from "./isAuthQuery";
export default async function({ req, res }) {
  const token = get(req, "headers.authorization", false);
  if (token === false) {
    throw internalServerError({ message: "Unauthorized, Reason: Missing auth token" });
  }
  let user = await getUserWithAccessToken(token);
  if (!user) {
    throw internalServerError({ message: "Unauthorized, You need to signin." });
  }
  return {
    user
  };
}
