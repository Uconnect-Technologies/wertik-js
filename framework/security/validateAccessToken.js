import gql from "graphql-tag";
import {models} from "./../connection/connection.js";
import {get} from "lodash";
export default function (req, res, next) {
	let method = req.method.toLowerCase();
	let {body: {query}} = req;
	if (query) {
		let authorization = get(req,'headers.authorization','...');
		if (authorization == "...") {
			next();
		}
		if (process.env.ALLOW_GRAPHQL == "TRUE") {
			next()
		}
	}else {
		if (method == 'get') {
			next();
		}else {
			res.json({
				errorMessageType: "Query not send",
				errorMessage: "Please send query"
			})
		}
	}
	// let parsed = gql`${query}`;
	// let queryName = get('parsed','definitions[0].selectionSet.selections[0].name.value','');
	// let auth = ["signup","resetPassword","requestPasswordResetToken","login","activateAccount"];
	// let isAuth = auth.indexOf(queryName) > -1;
	// if (isAuth) {
	// 	next();
	// }
	// res.json({
	// 	errorMessageType: "Token missing",
	// 	errorMessage: "Please provide authorization token"
	// });
	// return false;
}