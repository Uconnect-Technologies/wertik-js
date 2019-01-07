import Handlebars from "handlebars";
import isValidType from "./isValidType.js";
import {camelCase} from "lodash";
import {extractNameAndType ,splitFieldsIntoArrays} from "./generatorHelpers.js";

export default function (fields) {
	let added = [];
	let output = '';
	let split = splitFieldsIntoArrays(fields);
	for (var i = 0; i < split.length; i++) {
		const {name, type} = extractNameAndType(split[i]);
		if (added.indexOf(name) == -1) {
			if (isValidType(type)) {
				added.push(name);
				output = `${output}
				...queryMutationArgument('${camelCase(name)}','${type.toLowerCase()}'),`;
			}else {
				console.log(`${name} type is unkown which is ${type}, please add it manually.`)
			}
		}else {
			console.log(`You are trying to add ${name} twice, Ignored!`)
		}
	}
	return new Handlebars.SafeString(output);
}