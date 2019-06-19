import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder";
import fileExists from "./../helpers/fileExists";
import {join} from "path";

export default function(rootDirectory: string) {
  let predefinedModules = process.env.predefinedModules.split(",");
  let output = "";
  predefinedModules.forEach(async name => {
    let filePath = join(__dirname,"../../framework/predefinedModules",name,"schema.js");
  	if (fileExists(filePath)) {
	    let content = require(filePath).default;
	    output = output + content;
  	}
  });
  return output;
}
