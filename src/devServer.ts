import { connectDatabase, serve } from "./main";
import { IConfiguration } from "./framework/types/configuration";
const defaultConfiguration: IConfiguration = require("./framework/defaults/defaultConfigurations/defaultConfiguration").default;
const postgresConfiguration: IConfiguration = require("./framework/defaults/defaultConfigurations/postgresConfiguration").default;

let configuration = defaultConfiguration;

connectDatabase(configuration.database)
  .then((databaseInstance) => {
    configuration.databaseInstance = databaseInstance;
    serve(configuration).then((wertikApp: any) => {
      wertikApp.database.sync();
    });
  })
  .catch((e) => {
    console.log(`Error connecting with database`);
    console.log(e);
  });
