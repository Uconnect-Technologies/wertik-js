import fileExists from "./../helpers/fileExists";
import dynamic from "./../dynamic/index";
let { join } = require("path");
let { camelCase, upperFirst } = require("lodash");

export default function (rootDirectory: any) {
  let predefinedModules = process.env.predefinedModules.split(",");
  let output = "";
  predefinedModules.forEach(async name => {
    let filePath = join(__dirname, "../../framework/predefinedModules", name, "subscriptions.js");
    let fileExist = fileExists(filePath);
    let content = "";
    if (fileExist) {
      content = require(filePath).default;
      output = output + content;
    }
  });
  return output;
}