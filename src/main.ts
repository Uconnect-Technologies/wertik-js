import express from "express";
import graphqlInit from "./framework/graphql/index";
import morgan from "morgan";

var app = express();

app.use(morgan('combined'))

graphqlInit(__dirname, app);

app.listen(4000, () => console.log("Listening server on localhost:4000/graphql")
);