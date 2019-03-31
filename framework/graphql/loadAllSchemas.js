import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder.js";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  let modules = process.env.MODULES_ENABLED.split(",");
  let output = "";
  modules.forEach(async name => {
    let content = require(`${path}${name}/schema.js`).default;
    output = output + content;
  });
  return output;
}
