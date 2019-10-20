let { get } = require("lodash");
export default async function (user: any, token: string) {
	let find = await user.findOne({ accessToken: token });
	return find;
} 