let { ApolloError } = require("apollo-server");
export default function (e: any) {
	throw new ApolloError(e.message,500,{});
}