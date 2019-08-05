const { ApolloServer } = require('apollo-server');

import mutations from "./loadAllMutations";
import queries from "./loadAllQueries";
import resolvers from "./loadAllResolvers";
import subscriptions from "./loadAllSubscriptions";
import schemas from "./loadAllSchemas";
import generalSchema from "./../helpers/generalSchema";
import validateAccessToken from "./../security/validateAccessToken";

export default function (rootDirectory: string,app: any) {
	let appMutations = mutations(rootDirectory);
	let appQueries=  queries(rootDirectory);
	let appSchema = schemas(rootDirectory);
	let appResolvers = resolvers(rootDirectory);
	let appSubscriptions = subscriptions(rootDirectory);
	let mainSchema  = `
		${generalSchema}
		${appSchema}
		type Subscription {
			${appSubscriptions}
		}
		type Mutation {
			${appMutations}
		}
		type Query {
			${appQueries}
		}
		schema {
			query: Query
			mutation: Mutation
			subscription: Subscription
		}
	`;
	const server = new ApolloServer({ 
		typeDefs: mainSchema, 
		resolvers: appResolvers,
		context: async (req: any) => {
			let validateToken = await validateAccessToken(req);
			return {
				...validateToken
			}
		}
	});
	server.listen(1209).then(({ url, subscriptionsUrl }) => {
		console.log(`Server ready at ${url}`);
		console.log(`Subscriptions ready at ${subscriptionsUrl}`);
	});
}