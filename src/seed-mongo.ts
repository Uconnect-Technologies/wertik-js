import wertick from "./main";
import devServerConfiguration from "./dev-server-configuration"

let a = wertick.run(devServerConfiguration);

a.then(app => {
    let mysqlSeedRunner = require("./framework/database/mongodb/runSeeds").default
    console.log("Running seeds for MongoDB");
    mysqlSeedRunner({ "asd": "ads" });
});