import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder.js";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  // let folders = getDirectoriesInfolder(path);
  let folders = ['user', 'forgetPassword','permission','role','rolePermission','userRole' ];
  let output = "";
  folders.forEach(async name => {
    let content = require(`${path}${name}/mutation.js`);
    content = content.default.replace("type Mutation {", "");
    content = content.replace("}", "");
    output = output + content;
  });
  return output;
}
