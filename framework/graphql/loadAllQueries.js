import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder.js";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  // let folders = getDirectoriesInfolder(path);
  let folders = ['user', 'forgetPassword','permission','role','rolePermission','userRole','userPermission',"profile" ];
  let output = "";
  folders.forEach(async name => {
    let content = require(`${path}${name}/query.js`).default;
    content = content.replace("type Query {", "");
    content = content.replace("}", "");
    output = output + content;
  });
  return output;
}
