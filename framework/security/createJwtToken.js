import moment from "moment";
import jwt from "jsonwebtoken";
export default async function createJwtToken(data) {
	let firstArgument = {data: data};
	let secret = "secret";
	let thirdArgument = { expiresIn: moment().add('1', 'days').seconds()};
	return await jwt.sign(firstArgument, secret, thirdArgument);
}