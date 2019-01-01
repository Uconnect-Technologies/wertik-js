import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import UserSchema from "./schema.js";

const UserQueries = {
	user: {
		type: UserSchema,
		resolve() {
			return {
				email: 1
			}
		}
	}
}

export default UserQueries;