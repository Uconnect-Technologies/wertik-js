let jwt = require("jsonwebtoken");
let {get} = require("lodash")
export default async function (token: any) {
	let decoded = jwt.decode(token, get(process,'env.JWT_SECRET',''));
	let isPublic = get(decoded,'public',false);
	return isPublic;
}