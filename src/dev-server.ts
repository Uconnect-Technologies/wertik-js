import wertick from "./main";
import devServerConfiguration from "./dev-server-configuration";

let a = wertick.run(devServerConfiguration);

a.then(app => {
  if (!app) {
    console.log("Something went wrong while running wertik.run()");
  } else {
    console.log("Server is up");
  }
});
