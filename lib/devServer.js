"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const defaultConfiguration = require("./framework/defaults/defaultConfigurations/defaultConfiguration").default;
const postgresConfiguration = require("./framework/defaults/defaultConfigurations/postgresConfiguration").default;
let configuration = defaultConfiguration;
main_1.connectDatabase(configuration.database)
    .then((databaseInstance) => {
    configuration.databaseInstance = databaseInstance;
    main_1.serve(configuration).then((wertikApp) => {
        wertikApp.database.sync();
        // To run seeds you need code below. In Array you have Array<String>, where you can assign module name to create.
        // wertikApp.seeds(['RolePermission'])
    });
})
    .catch((e) => {
    console.log(`Error connecting with database`);
    console.log(e);
});
//# sourceMappingURL=devServer.js.map