import internalServerError from "./../helpers/internalServerError";
import getUserWithAccessToken from "./getUserWithAccessToken";
import isAuthQuery from "./isAuthQuery";
export default async function({ req, res }) {
  console.log(isAuthQuery(req.body.query));
  // const token = req.headers.authorization || "";
  // if (!token) {
  //   internalServerError({
  //     message: "Unauthorized, Reason: Missing auth token"
  //   });
  // }
  // let user = await getUserWithAccessToken(token);
  // if (!user) {
  //   internalServerError({ message: "Unauthorized, You need to signin." });
  // }
  // return {
  //   user
  // };
}
