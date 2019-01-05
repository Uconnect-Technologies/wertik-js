import {
	GraphQLInt,
	GraphQLString
} from "graphql";

export function getType(type) {
	if (type == "string") {
		return GraphQLString
	}else if (type == "number" || type == "integer") {
		return GraphQLInt
	}
}

export default function (name,type) {
	return {
		[name]: {
			type: getType(type)
		}
	}
}