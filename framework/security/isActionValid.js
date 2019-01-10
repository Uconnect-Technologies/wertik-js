import {models} from "./../connection/connection.js";
import {get} from "lodash";

export default async function (user,action) {
	let permission = get(models,'permission',null)
	if (permission) {
		let find = await permission.findOne({
			where: {
				action: action,
				user: user.id
			}
		});
		if (user.superUser) {
			return true;
		}
		return (!find) ? false : true;
	}
}