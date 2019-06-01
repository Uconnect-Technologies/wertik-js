import {models} from "./../../../framework/database/connection";
import Model from "./../../../framework/model/model";
import {ApolloError} from "apollo-server";
import isAuthQuery from "./../../../framework/security/isAuthQuery";
import isTokenExpired from "./../../../framework/security/isTokenExpired";
import statusCodes from "./../../../framework/helpers/statusCodes";
import {get} from "lodash";

let userModel = new Model({
	models: models,
	tableName: "user"
});

export default {
	async validateAccessToken(req) {
		// let query = req.body.query;
		// let token = get(req,'headers.authorization','');
		// let isAuthGraphqlQuery = isAuthQuery(query);
		// if (isAuthGraphqlQuery) {
		// 	return {};
		// }
		// console.log(token);
		// if (!token) {
		// 	throw new ApolloError("JWT not passed",statusCodes.UNAUTHORIZED.number)
		// }
		// let isExpired = await isTokenExpired(token);
		// if (isExpired) {
		// 	throw new ApolloError("Jwt Token Expired",statusCodes.UNAUTHORIZED.number)
		// }
		// let user = await userModel.findOne({accessToken: token});
		// if (!user) {
		// 	throw new ApolloError("You should login",statusCodes.UNAUTHORIZED.number)
		// }
		// return {user: user};
	}
}