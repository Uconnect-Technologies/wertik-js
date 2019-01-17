import express from "express";
import graphqlInit from "./framework/graphql/index.js";
import connection from "./framework/database/connection.js";

var app = express();

graphqlInit(__dirname,app);

app.listen(4000,() => console.log("Listening server on localhost:4000/graphql"))