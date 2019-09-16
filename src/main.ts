import validateConfigurationObject from "./framework/helpers/validateConfigurationObject";
import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";
export default function (app,configuration) {
    validateConfigurationObject(configuration).then(() => {
        convertConfigurationIntoEnvVariables(configuration).then(() => {
            let graphql = require("./framework/graphql/index").default;
            let restApi = require("./framework/restApi/index").default;
            graphql(app,configuration);
            restApi(app,configuration);
        }).catch((err2) => {
            console.log("Something went wrong while setting data to env, Please node version.");
            console.log(err2);
        })
    }).catch((err) => {
        console.log(err);
    })
}