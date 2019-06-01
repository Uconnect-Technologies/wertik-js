import {models} from "./../connection/connection";	
export default async function (email,token) {
	let {user} = models;
	let find = await user.findOne({where: {email: email,accessToken: token}});
	return find;
} 