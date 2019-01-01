import loadSchema from "./../framework/schema/loadSchema.js";
import GraphQLHttp from 'express-graphql';

export default function (app) {
	let schema = loadSchema();
	app.use('/graphql' , GraphQLHttp((req, res) => {
		return {
			schema: schema,
			pretty: true,
			graphiql: true,
		};
	}));
}