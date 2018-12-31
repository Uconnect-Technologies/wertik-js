/*
	Creates GraphQL schema and exports it,
*/
import loadAllMutations from "./../mutations/loadAllMutations.js";
import loadAllQueries from "./../queries/loadAllQueries.js";

import schema from "./../../app/modules/forgetPassword/schema.js";

import {GraphQLObjectType, GraphQLSchema,GraphQLString} from "graphql";


export default function () {
	let mutations = loadAllMutations();
	let queries = loadAllQueries();
	let query = new GraphQLObjectType({
		name: "Queries",
		description: `All Queries for ${process.env.NAME}`,
		fields: () => {
			return {
				...queries
			}
		}
	});
	let mutation = new GraphQLObjectType({
		name: "mutation",
		description: `All Mutations for ${process.env.NAME}`,
		fields() {
			return {
				...mutations
			}
		}
	})
	return new GraphQLSchema({
		query: query,
		mutation: mutation
	})
}