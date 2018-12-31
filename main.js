import Express from "express";
import GraphQLHttp from 'express-graphql';
import startGraphql from "./app/GraphQL.js";
import startRestService from "./app/rest.js";

const app = Express();

import connection from "./framework/connection/connection.js";

const {
	PORT,
	MODE
} = process.env;

app.listen(PORT, () => {
	startGraphql();
	startRestService();
	console.log("GraphQL and Rest API services are up and running");
	console.log(`App is running on Port:${PORT}. Database: ${MODE}`);
	console.log(`GraphQL Running on localhost:${PORT}/graphql`);
});