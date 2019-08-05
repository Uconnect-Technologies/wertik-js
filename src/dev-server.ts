import wertick from "./main";
import devServerConfiguration from "./dev-server-configuration"

let a = wertick.run(devServerConfiguration);

a.then(app => {
  console.log("Server is up now yeah");
  app.models.roleModel.seed()
});