import { ApolloError } from "apollo-server";
export default function (e: any) {
	throw new ApolloError(e.message,500,{});
}