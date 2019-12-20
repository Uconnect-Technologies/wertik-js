import { get } from "lodash";
import fs from "fs";
import { join } from "path";
import { filesInAFolder } from "./../helpers/index";
export default function(configuration, rootPath) {
  let allEmailTemplates = filesInAFolder(`${__dirname}/email-templates`);
  let templatesObject = {};
  allEmailTemplates.forEach(element => {
    let name = element.split(".")[0];
    let template = require(`./email-templates/${name}`).default;
    templatesObject[name] = template;
  });

  return {
    ...templatesObject,
    ...get(configuration, "emailTemplates", {})
  };
}
