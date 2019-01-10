import loadSchema from "./../framework/schema/loadSchema.js";
import GraphQLHttp from 'express-graphql';
import moment from "moment"
import validateAccessToken from "./../framework/security/validateAccessToken.js";

export default function (app) {
	let schema = loadSchema();
	app.use('/graphql' , validateAccessToken , GraphQLHttp((req, res) => {
		console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] Incoming graphql request`);
		return {
			schema: schema,
			pretty: true,
			graphiql: false,
		};
	}));
}