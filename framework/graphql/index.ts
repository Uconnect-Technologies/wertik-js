import mutations from "./loadAllMutations.ts";
import queries from "./loadAllQueries.ts";
import resolvers from "./loadAllResolvers";
import schemas from "./loadAllSchemas.ts";
import generalSchema from "./../../app/generalSchema.ts";
import {buildSchema} from "graphql";
const { ApolloServer, gql } = require('apollo-server');

export default function (rootDirectory,app) {
	let allMutations = mutations(rootDirectory);
	let allQueries=  queries(rootDirectory);
	let allSchemas = schemas(rootDirectory);
	let allResolvers = resolvers(rootDirectory);
	let {validateAccessToken} = require(`${rootDirectory}/framework/predefinedModules/user/auth.ts`).default;
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
		context: async ({req}) => {
			await validateAccessToken(req);
		}
	});
	server.listen(1209).then(({ url }) => {
	  console.log(`Server ready at ${url}`);
	});
}