let {buildSchema} = require("graphql");
const { ApolloServer, gql } = require('apollo-server');

import mutations from "./loadAllMutations";
import queries from "./loadAllQueries";
import resolvers from "./loadAllResolvers";
import schemas from "./loadAllSchemas";
import generalSchema from "./../../app/generalSchema";

export default function (rootDirectory: string,app: any) {
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
			mutation: Mutation
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