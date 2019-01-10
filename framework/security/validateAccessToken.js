import gql from "graphql-tag";
import jwt from "jsonwebtoken";
import {models} from "./../connection/connection.js";
import moment from "moment";
import {get} from "lodash";
import isActionValid from "./isActionValid.js";


export function isDateExpired(unixDate) {
	return moment().unix()>unixDate;
}

export function getCurrentQueryName(query) {
	let parsed = gql`${query}`;
	let queryName = get(parsed,'definitions[0].selectionSet.selections[0].name.value','');
	return queryName;
}

export function isAuthQuery(query) {
	let name = getCurrentQueryName(query);
	let auth = ["signup","resetPassword","requestPasswordResetToken","login","activateAccount"];
	return auth.indexOf(name) > -1;
}

export async function userWithToken(access,res,next) {
	let user = get(models,'user',null);
	if (user) {
		let find = await user.findOne({
			where: {
				accessToken: access
			}
		});
		if (!find) {
			res.json({
				errorMessageType: "User not found",
				errorMessage: "User not found with such token"
			});
			return;
		}else {
			return find;
		}
	}
}

export default async function (req, res, next) {
	let method = req.method.toLowerCase();
	let {body: {query}} = req;
	let authQuery = isAuthQuery(query);
	if (query) {
		let authorization = get(req,'headers.authorization','...');
		if (authorization == "...") {
			next();
			return;
		}
		if (process.env.ALLOW_GRAPHQL == "TRUE") {
			next();
			return;
		}
		let token = authorization.replace("Bearer ","");
		let decoded = jwt.decode(token, get(process,'env.JWT_SECRET',''));
		let exp = get(decoded,'expireDate');
		if (!exp && !authQuery) {
			res.json({
				errorMessageType: "Something went wrong",
				errorMessage: "JWT failed, expireDate not found in jwt"
			});
			return;
		}
		if (isDateExpired(exp)) {
			res.json({
				errorMessageType: "Login failed",
				errorMessage: "Session expired please login again"
			});
			return;
		}
		if (authQuery) {
			next();
			return;
		}
		let user = await userWithToken(token,res,next);
		let isValid = await isActionValid(user,getCurrentQueryName(query));
		if (!isValid) {
			res.json({
				errorMessageType: "Permission Denied",
				errorMessage: `You are not allowed to perform action: ${getCurrentQueryName(query)}`
			});
			return;
		}
		next();
	}else {
		if (method == 'get') {
			next();
		}else {
			res.json({
				errorMessageType: "Query not send",
				errorMessage: "Please send query"
			})
		}
	}
}