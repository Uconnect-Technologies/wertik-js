import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import UserSchema from "./schema.js";
import UserController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

export default {
	user: {
		type: UserSchema,
		name: "User Fetch",
		description: "Fetches a user according to user.id",
		args: {
			...queryMutationArgument('id','number')
		},
		async resolve(_, args) {
			return await UserController.user(_, args);
		}
	},
	generalAccessToken: {
		type: UserSchema,
		name: "General Access Token",
		description: "Allows you to view general access token",
		async resolve(_, args) {
			return {
				accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJwdWJsaWMiOnRydWUsImlhdCI6MTU0NzEzMTQ2OX0.wk6rBW_2xu56XBsPibsc9DXCHO4-P4cSGas26BOxlKw',
				successMessageType: 'General Acces token',
				successMessage: "General access token created"
			}
		}
	}
}