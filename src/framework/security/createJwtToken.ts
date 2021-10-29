let moment = require("moment");
let jwt = require("jsonwebtoken");
import { get, has } from "lodash";

export default async function createJwtToken(data: any) {
  if (typeof data !== "object") {
    throw "Data must be object";
  }
  let firstArgument = data;
  let secret = process.env.jwtSecret || "asdasdasd";
  return await jwt.sign(firstArgument, secret, { expiresIn: data.expiresIn });
}
