let { ApolloError } = require("apollo-server");
export default function (e: any) {
	return new ApolloError(e.message,500,{});
}