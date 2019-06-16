import express from "express";
import graphqlInit from "./framework/graphql/index";
import morgan from "morgan";

const app = express();
app.use(morgan('combined'));

export default {
    run: function (configuration) {
        graphqlInit(__dirname, app, configuration);
        app.listen(4000, function () {
            console.log("Listening server on localhost:4000/graphql");
        });
    }
}