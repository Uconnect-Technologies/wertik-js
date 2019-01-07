export const extractNameAndType = function (field) {
	let splitColon = field.split(":")
	if (splitColon.length == 2) {
		return {
			type: splitColon[0],
			name: splitColon[1]
		}
	}else {
		console.log(`${splitColon} is not splittable`);
	}
}

export const splitFieldsIntoArrays = function (fields) {
	return fields.split(" ");
}