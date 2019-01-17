import getDirectoriesInfolder from "./../helpers/getDirectoriesInfolder.js";

export default function (rootDirectory) {

	let path = `${rootDirectory}/app/modules/`;
	let folders = getDirectoriesInfolder(path);
	let output = "";
	folders.forEach(async (name) => {
		let content = require(`${path}${name}/mutation.js`);
		content = content.default.replace("type Mutation {","");
		content = content.replace("}", '');
		output = output + content;
	});
	return output;
}