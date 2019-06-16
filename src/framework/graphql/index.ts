let {buildSchema} = require("graphql");
const { ApolloServer, gql } = require('apollo-server');

import mutations from "./loadAllMutations";
import queries from "./loadAllQueries";
import resolvers from "./loadAllResolvers";
import schemas from "./loadAllSchemas";
import generalSchema from "./../helpers/generalSchema";

export default function (rootDirectory: string,app: any,configuration: object) {
	
	// let {
	// 	name,
	// 	mode, 
	// 	port,
	// 	database, 
	// 	predefinedModules, 
	// 	dialect, 
	// 	mailer, 
	// 	logging,
	// 	backendApp,
	// 	frontendAppUrl,
	// 	frontendAppPasswordResetUrl
	// } = configuration;
	// let {dbUsername, dbPassword, dbHost, dbPort,mongoUrl} = database;

	let allMutations = mutations(rootDirectory);
	let allQueries=  queries(rootDirectory);
	let allSchemas = schemas(rootDirectory);
	let allResolvers = resolvers(rootDirectory);
	let {validateAccessToken} = require(`${rootDirectory}/framework/predefinedModules/user/auth`).default;
	let mainSchema  = `
		${generalSchema}
		${allSchemas}

		type Mutation {
			${allMutations}
		}
		type Query {
			${allQueries}
		}
		schema {
			query: Query
			mutatiobn: Mutation
		}
	`;
	let schema = buildSchema(mainSchema);
	const server = new ApolloServer({ 
		typeDefs: mainSchema, 
		resolvers: allResolvers,
		context: async (a: any) => {
			await validateAccessToken(a.req);
		}
	});
	server.listen(1209).then((a: any) => {
	  console.log(`Server ready at ${a.url}`);
	});
}