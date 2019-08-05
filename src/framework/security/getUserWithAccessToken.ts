import allModels from "../dynamic/allModels";
let {get} = require("lodash");
export default async function (token: string) {
	let user: any = get(allModels,'userModel',null);
	let find = await user.findOne({accessToken: token});
	return find;
} 