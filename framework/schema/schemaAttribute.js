import {getType} from "./mutationArgument.js";

export default function (name,type,customResolver = "empty") {

	return {
		[name]: {
			type: getType(type),
			resolve(model) {
				if (customResolver == "empty") {
					return model[name];
				}else {
					return customResolver(model);
				}
			}
		}
	}
}
