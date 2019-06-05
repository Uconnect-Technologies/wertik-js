import {get} from "lodash";
import jwt from "jsonwebtoken";
import isPublicToken from "./isPublicToken";
import getUserWithTokenAndEmail from "./getUserWithTokenAndEmail";
export default async function isTokenValid(token: string) {
	let decoded = jwt.decode(token, get(process,'env.JWT_SECRET',''));	
	let email = get(decoded,'email',null);

	if (!email) {
		return false;
	}

	let user = await getUserWithTokenAndEmail(email,token);
	
	if (!user) {
		return false;	
	}

	return user;
}