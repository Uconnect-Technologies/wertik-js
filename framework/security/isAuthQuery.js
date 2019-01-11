import {get} from "lodash"
import gql from 'graphql-tag';
export default function (query) {
	console.log(query,1);
	let parsed = gql`${query}`;
	let queryName = get(parsed,"definitions[0].selectionSet.selections[0].name.value",'');
	let auth = ["signup","resetPassword","requestPasswordResetToken","login","activateAccount","generalAccessToken"];
	return auth.indexOf(queryName) > -1;;
}