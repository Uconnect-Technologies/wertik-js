import {get} from "lodash"
import gql from 'graphql-tag';
export default function (query) {
	let parsed = gql`${query}`;
	let queryName = get(parsed,"definitions[0].selectionSet.selections[0].name.value",'');
	let auth = [
		"signup",
		"resetPassword",
		"requestPasswordResetToken",
		"login",
		"activateAccount",
		"generalAccessToken",
		"twoFactorLogin",
		"twoFactorLoginValidate"
	];
	return auth.indexOf(queryName) > -1;;
}