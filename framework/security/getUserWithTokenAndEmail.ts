import allModels from "./../dynamic/allModels";
import {get} from "lodash";
export default async function (email: string,token: string) {
	let user: any = get(allModels,'user',null)
	let find = await user.findOne({where: {email: email,accessToken: token}});
	return find;
} 