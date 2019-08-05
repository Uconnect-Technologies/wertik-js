let { ApolloError } = require("apollo-server");
let jwt = require("jsonwebtoken");
let { get } = require("lodash")

import statusCodes from "./../helpers/statusCodes";

export default async function (jwtToken: string) {
	try {
		let decoded: any = await jwt.decode(jwtToken, get(process, 'env.JWT_SECRET', ''));
		let { expireDate } = decoded;
		let current = + new Date();
		let expireDateSeconds = expireDate * 1000;
		if (expireDateSeconds < current) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		throw new ApolloError("JWT Token Mismatched", statusCodes.BAD_REQUEST.number)
	}
}