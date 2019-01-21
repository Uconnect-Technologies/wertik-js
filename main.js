import express from "express";
import graphqlInit from "./framework/graphql/index.js";
import connection from "./framework/database/mysql/connection.js";
import mongodb from "./framework/database/mongodb/mongoose.js";

var app = express();


console.log(mongodb.models.user)

graphqlInit(__dirname, app);

app.listen(4000, () =>
  console.log("Listening server on localhost:4000/graphql")
);
