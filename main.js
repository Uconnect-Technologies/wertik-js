import express from "express";
import graphqlInit from "./framework/graphql/index.js";
import connection from "./framework/database/mysql/connection.js";
import mongodb from "./framework/database/mongodb/mongoose.js";

var app = express();

setTimeout(() => {
	let a = new mongodb.models.user;
	a.gender = "123";
	a.save((err) =>  {
		console.log(err);
	});
	let b = new mongodb.models.forgetpassword;
	b.email = "123";
	b.save((err) =>  {
		console.log(err);
	});
},7000);

graphqlInit(__dirname, app);

app.listen(4000, () =>
  console.log("Listening server on localhost:4000/graphql")
);
