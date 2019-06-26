const { ApolloServer } = require('apollo-server');

import mutations from "./loadAllMutations";
import queries from "./loadAllQueries";
import resolvers from "./loadAllResolvers";
import subscriptions from "./loadAllSubscriptions";
import schemas from "./loadAllSchemas";
import generalSchema from "./../helpers/generalSchema";

export default function (rootDirectory: string,app: any,configuration: object) {
	let allMutations = mutations(rootDirectory);
	let allQueries=  queries(rootDirectory);
	let allSchemas = schemas(rootDirectory);
	let allResolvers = resolvers(rootDirectory);
	let allSubscriptions = subscriptions(rootDirectory);
	let {validateAccessToken} = require(`${rootDirectory}/framework/predefinedModules/user/auth`).default;
	let mainSchema  = `
		${generalSchema}
		${allSchemas}
		type Subscription {
			${allSubscriptions}
		}
		type Mutation {
			${allMutations}
		}
		type Query {
			${allQueries}
		}
		schema {
			query: Query
			mutation: Mutation
			subscription: Subscription
		}
	`;
	const server = new ApolloServer({ 
		typeDefs: mainSchema, 
		resolvers: allResolvers,
		context: async (a: any) => {
			await validateAccessToken(a.req);
		}
	});
	server.listen(1209).then(({ url, subscriptionsUrl }) => {
		console.log(`Server ready at ${url}`);
		console.log(`Subscriptions ready at ${subscriptionsUrl}`);
	});
}