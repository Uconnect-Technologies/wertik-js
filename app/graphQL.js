import loadSchema from "./../framework/schema/loadSchema.js";
import GraphQLHttp from 'express-graphql';

export default function (app) {
	console.log("Starting Graphql");
	let schema = loadSchema();
	app.use('/graphql' , GraphQLHttp((req, res) => {
		return {
			schema: schema,
			pretty: true,
			graphiql: true,
		};
	}));
}