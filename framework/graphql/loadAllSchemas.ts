import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder.ts";
import fileExists from "./../helpers/fileExists.ts";
import {join} from "path";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  let modules = process.env.MODULES_ENABLED.split(",");
  let predefinedModules = process.env.PREDEFINED_MODULES.split(",");
  let output = "";
  predefinedModules.forEach(async name => {
    let filePath = join(__dirname,"../../framework/predefinedModules",name,"schema.ts");
  	if (fileExists(filePath)) {
	    let content = require(filePath).default;
	    output = output + content;
  	}
  });
  return output;
}
