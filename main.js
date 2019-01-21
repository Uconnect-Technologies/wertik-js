require('module-alias/register');

import Express from "express";
import bodyParser from "body-parser";
import startGraphql from "./app/graphQL.js";
import startRestService from "./app/rest.js";
import conn from "./framework/connection/connection.js";

const app = Express();
app.use(bodyParser.urlencoded({
  extended: true,
  json: true,
}));
app.use(bodyParser.json());

const {
	PORT,
	MODE
} = process.env;

conn.sync().then(()=> {
	app.listen(PORT, () => {
		startGraphql(app);
		startRestService();
		if (process.env.LOGGING.toLowerCase() == "true") {
			console.log("GraphQL and Rest API services are up and running");
			console.log(`App is running on Port:${PORT}. Database: ${MODE}`);
		}
		console.log(`GraphQL Running on localhost:${PORT}/graphql`);
	});
});