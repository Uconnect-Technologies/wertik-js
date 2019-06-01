import jwt from "jsonwebtoken";
import {get} from "lodash";
export default async function (token) {
	let decoded = jwt.decode(token, get(process,'env.JWT_SECRET',''));
	let isPublic = get(decoded,'public',false);
	return isPublic;
}