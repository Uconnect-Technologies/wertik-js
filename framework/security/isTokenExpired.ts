let {get} = require("lodash")
let jwt = require("jsonwebtoken");
let {ApolloError} = require("apollo-server");
import statusCodes from "./../helpers/statusCodes";

export default async function (jwtToken: string) {
	try {
		let decoded: any = await jwt.decode(jwtToken, get(process,'env.JWT_SECRET',''));
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