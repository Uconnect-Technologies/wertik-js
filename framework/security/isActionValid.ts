import allModels from "./../dynamic/allModels";
import {get} from "lodash";

export default async function (user: any,action: string) {
	let permission = get(allModels,'permissionModel',null)
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