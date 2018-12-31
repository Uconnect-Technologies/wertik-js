/*
	Creates GraphQL schema and exports it,
*/
import loadAllMutations from "./../mutations/loadAllMutations.js";
import loadAllQueries from "./../queries/loadAllQueries.js";
import {
	GraphQLObjectType
} from 'graphql';
export default function () {
	let mutations = loadAllMutations();
	let queries = loadAllQueries();
	return {
	}
}