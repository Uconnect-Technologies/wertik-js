export default function (fields) {
	let output = '';
	let split = fields.split(" ");
	for (var i = 0; i < split.length; i++) {
		let splitColon = split[i].split(":")
		if (splitColon.length == 2) {
			let columnName = splitColon[0];
			let type = splitColon[1];
			output = output + new String(`...schemaAttribute('${columnName},${type}) `).toString();
		}else {
			console.log(`${splitColon} is not splittable`);
		}
	}
	return output;
}