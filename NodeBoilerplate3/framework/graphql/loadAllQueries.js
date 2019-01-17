import getDirectoriesInfolder from "./../helpers/getDirectoriesInfolder.js";

export default function (rootDirectory) {
	let path = `${rootDirectory}/app/modules/`;
	let folders = getDirectoriesInfolder(path);
	let output = "";
	folders.forEach(async (name) => {
		let content = require(`${path}${name}/query.js`).default;
		content = content.replace("type Query {","");
		content = content.replace("}", '');
		output = output + content;
	});
	return output;
}