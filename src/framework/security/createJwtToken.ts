let moment = require("moment");
let jwt = require("jsonwebtoken");

export default async function createJwtToken(data: any) {
  if (typeof data !== "object") {
    throw "Data must be object";
  }
  data.expireDate = moment().add(1, "days").unix();
  let firstArgument = data;
  let secret = process.env.jwtSecret || "asdasdasd";
  return await jwt.sign(firstArgument, secret);
}
