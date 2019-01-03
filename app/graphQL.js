import loadSchema from "./../framework/schema/loadSchema.js";
import GraphQLHttp from 'express-graphql';
import validateAccessToken from "./../framework/security/validateAccessToken.js";

export default function (app) {
	let schema = loadSchema();
	app.use('/graphql' , validateAccessToken , GraphQLHttp((req, res) => {
		return {
			schema: schema,
			pretty: true,
			graphiql: true,
		};
	}));
}