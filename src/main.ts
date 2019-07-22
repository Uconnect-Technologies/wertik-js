import express from "express";
import graphqlServer from "./framework/graphql/index";
import apiServer from "./framework/api-server/index";
import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";
import morgan from "morgan";

const app = express();
app.use(morgan('combined'));

export default {
    run: function (configuration) {
        convertConfigurationIntoEnvVariables(configuration, function ()  {
            graphqlServer(__dirname, app);
            apiServer(__dirname, app);
            app.listen(4000, function () {
                console.log("listening server on localhost:4000/graphql");
            });
        })
    }
}