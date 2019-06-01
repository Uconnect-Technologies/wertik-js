import { ApolloError } from "apollo-server";
export default function (e) {
	throw new ApolloError(e.message,500,{});
}