import validateConfigurationObject from "./framework/helpers/validateConfigurationObject";
import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";
export default function (app,configuration) {
    validateConfigurationObject(configuration).then(() => {
        convertConfigurationIntoEnvVariables(configuration).then(() => {
            let graphql = require("./framework/graphql/index").default;
            let restApi = require("./framework/restApi/index").default;
            let dbTables = require("./framework/database/loadTables").default()
            let models = require("./framework/database/models").default(dbTables);
            graphql(app,configuration,dbTables,models);
            restApi(app,configuration,dbTables,models);
            app.listen(3000);
        }).catch((err2) => {
            console.log("Something went wrong while setting data to env, Please node version.");
            console.log(err2);
        })
    }).catch((err) => {
        console.log(err);
    })
}