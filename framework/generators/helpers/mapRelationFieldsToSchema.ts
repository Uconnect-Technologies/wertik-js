export default function (data) {
	let string = "";
	let split = data.split(" ");
	let addedModules = [];
	split.forEach((data) => {
		let splitColon = data.split(":");
		let [moduleName,type] = splitColon;
		let relationType = (type == "many") ?	 `[${moduleName}]` : moduleName;
		string = string + `${moduleName}: ${relationType}
		`;
	});
	return string;
}