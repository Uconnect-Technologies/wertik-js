import { ApolloError } from "apollo-server";
export default function (e,data) {
	throw new ApolloError(e.message,500,{});
}