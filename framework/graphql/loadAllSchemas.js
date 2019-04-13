import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder.js";
import fileExists from "./../helpers/fileExists.js";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  let modules = process.env.MODULES_ENABLED.split(",");
  let output = "";
  modules.forEach(async name => {
  	let filePath = `${path}${name}/schema.js`;
  	if (fileExists(filePath)) {
	    let content = require(`${path}${name}/schema.js`).default;
	    output = output + content;
  	}
  });
  return output;
}
