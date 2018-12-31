require('module-alias/register');

import Express from "express";
import startGraphql from "./app/GraphQL.js";
import startRestService from "./app/rest.js";
import init from "./framework/init.js";

const app = Express();

const {
	PORT,
	MODE
} = process.env;

app.listen(PORT, () => {
	init();
	startGraphql(app);
	startRestService();
	if (process.env.LOGGING.toLowerCase() == "true") {
		console.log("GraphQL and Rest API services are up and running");
		console.log(`App is running on Port:${PORT}. Database: ${MODE}`);
	}
	console.log(`GraphQL Running on localhost:${PORT}/graphql`);
});