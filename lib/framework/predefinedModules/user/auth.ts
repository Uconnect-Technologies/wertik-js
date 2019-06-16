let {get} = require("lodash");
let {ApolloError} = require("apollo-server");

import {models} from "./../../../framework/database/connection";
import Model from "./../../../framework/model/model";
import isAuthQuery from "./../../../framework/security/isAuthQuery";
import isTokenExpired from "./../../../framework/security/isTokenExpired";
import statusCodes from "./../../../framework/helpers/statusCodes";

let userModel = new Model({
	models: models,
	tableName: "user"
});

export default {
	async validateAccessToken(req: any) {
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