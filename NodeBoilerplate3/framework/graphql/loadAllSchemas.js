import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder.js";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  let folders = getDirectoriesInfolder(path);
  let output = "";
  folders.forEach(async name => {
    let content = require(`${path}${name}/schema.js`).default;
    output = output + content;
  });
  return output;
}
