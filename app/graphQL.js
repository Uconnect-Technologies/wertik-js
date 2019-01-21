import loadSchema from "./../framework/schema/loadSchema.js";
import GraphQLHttp from 'express-graphql';
import {get} from "lodash";
import moment from "moment"
import validateGraphqlAccessToken from "./../framework/security/validateGraphqlAccessToken.js";
let allowGraphql = get(process,'env.ALLOW_GRAPHQL');

export default function (app) {
	let schema = loadSchema();
	app.use('/graphql', validateGraphqlAccessToken , GraphQLHttp((req, res) => {
		console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] Incoming graphql request`);
		return {
			schema: schema,
			pretty: true,
			graphiql: (allowGraphql == "TRUE") ? true : false,
		};
	}));
}