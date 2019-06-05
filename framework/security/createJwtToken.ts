import * as moment from "moment";
import jwt from "jsonwebtoken";
export default async function createJwtToken(data: any) {
	if (typeof data !== "object") {
		throw "Data must be object";
	}
	data.expireDate = moment().add(1,'days').unix();
	let firstArgument = data;
	let secret = process.env.JWT_SECRET;
	return await jwt.sign(firstArgument, secret);
}