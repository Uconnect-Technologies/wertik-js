import express from "express";
import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";
import morgan from "morgan";

const app = express();
app.use(morgan('combined'));

export default {
    run: async function (configuration) {
        try {
            await convertConfigurationIntoEnvVariables(configuration);
            if (process.env.mode) {
                let initServers = require("./initServers").default;
                return await initServers(__dirname, app);
            }
        } catch (e) {
            console.log(`Something went wrong: ${e.message}`)
        }
    },
}