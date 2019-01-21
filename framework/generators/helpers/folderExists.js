const fs = require('fs');
const path = require('path');
let back = "./../../../"


export default function (dir) {
  if (fs.existsSync(path.join(__dirname, `${back}/modules/${dir}`))) {
    return true;
  }
  return false
}