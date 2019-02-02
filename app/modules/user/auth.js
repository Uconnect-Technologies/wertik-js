import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import {ApolloError} from "apollo-server";
import isAuthQuery from "./../../../framework/security/isAuthQuery.js";
import isTokenExpired from "./../../../framework/security/isTokenExpired.js";

let userModel = new Model({
	models: models,
	tableName: "user"
});

export default {
	async validateAccessToken(req) {
		let query = req.body.query;
		let isAuthGraphqlQuery = isAuthQuery(query);
		if (isAuthGraphqlQuery) {
			return {};
		}
		let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlseWFzLmRhdG9vQGdtYWlsLmNvbSIsImZvciI6ImF1dGhlbnRpY2F0aW9uIiwiZXhwaXJlRGF0ZSI6MTU0OTIyNzgzMCwiaWF0IjoxNTQ5MTQxNDMwfQ.s7_Dby1ZFhptapkFOhc37OZSNpfibJiLd2nzxge6eEg";
		let isExpired = await isTokenExpired(token);
		if (isExpired) {
			throw new ApolloError("Jwt Token Expired",statusCodes.UNAUTHORIZED.number)
		}
		let user = await userModel.findOne({accessToken: token});
		if (!user) {
			throw new ApolloError("You should login",statusCodes.UNAUTHORIZED.number)
		}
		return {user: user};
	}
}