import {get} from "lodash";
import jwt from "jsonwebtoken";
import {ApolloError} from "apollo-server";
export default async function (jwtToken) {
	try {
		let decoded = await jwt.decode(jwtToken, get(process,'env.JWT_SECRET',''));
		let {expireDate} = decoded;
		let current = + new Date();
		let expireDateSeconds = expireDate*1000;
		if (expireDateSeconds < current) {
			return true;
		}else {
			return false;
		}
	} catch(e) {
		throw new ApolloError("JWT Token Mismatched",statusCodes.BAD_REQUEST.number)
	}
}