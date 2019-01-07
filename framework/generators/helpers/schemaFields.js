import Handlebars from "handlebars";
import isValidType from "./isValidType.js";
import {camelCase} from "lodash";
export default function (fields) {
	let added = [];
	let output = '';
	let split = fields.split(" ");
	for (var i = 0; i < split.length; i++) {
		let splitColon = split[i].split(":")
		if (splitColon.length == 2) {
			let columnName = splitColon[0];
			let type = splitColon[1];
			if (added.indexOf(columnName) == -1) {
				if (isValidType(type)) {
					added.push(columnName);
					output = `${output}
					...queryMutationArgument('${camelCase(columnName)}','${type.toLowerCase()}'),`;
				}else {
					console.log(`${columnName} type is unkown which is ${type}, please add it manually.`)
				}
			}else {
				console.log(`You are trying to add ${columnName} twice, Ignored!`)
			}
		}else {
			console.log(`${splitColon} is not splittable`);
		}
	}
	return new Handlebars.SafeString(output);
}