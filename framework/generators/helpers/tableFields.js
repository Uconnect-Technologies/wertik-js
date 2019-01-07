import {camelCase} from "lodash";
import Handlebars from "handlebars";
export default function (fields) {
	let output = '';
	let split = fields.split(" ");
	for (var i = 0; i < split.length; i++) {
		let splitColon = split[i].split(":")
		if (splitColon.length == 2) {
			let columnName = splitColon[0];
			let type = splitColon[1];
			output = `${output}
		...tableField('${camelCase(columnName)}','${type.toLowerCase()}',{allowNull: false}),`;
		}else {
			console.log(`${splitColon} is not splittable`);
		}
	}
	return new Handlebars.SafeString(output);
}