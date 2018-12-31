/*
	Creates GraphQL schema and exports it,
*/
import loadAllMutations from "./../mutations/loadAllMutations.js";
import loadAllQueries from "./../queries/loadAllQueries.js";
export default function () {
	let mutations = loadAllMutations();
	let queries = loadAllQueries();
	return {
		mutations,
		queries
	}
}