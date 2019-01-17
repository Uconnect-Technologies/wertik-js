import {
	GraphQLInt,
	GraphQLString,
	GraphQLBoolean
} from "graphql";

export function getType(type) {
	if (type == "string") {
		return GraphQLString;
	}else if (type == "number" || type == "integer") {
		return GraphQLInt;
	}else if (type == "boolean") {
		return GraphQLBoolean;
	} 
}

export default function (name,type) {
	return {
		[name]: {
			type: getType(type)
		}
	}
}