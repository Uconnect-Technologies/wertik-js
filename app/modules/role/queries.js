import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import roleSchema from "./schema.js";
import roleController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

export default {
	listRole: {
		type: new GraphQLList(roleSchema),
		args: {
			...queryMutationArgument('page','number'),
			...queryMutationArgument('limit','number')
		},
		async resolve(_,args) {
			return await roleController.listRole(_,args);
		}
	},
	viewRole: {
		type: roleSchema,
		args: {
			...queryMutationArgument('id','number')
		},
		async resolve(_,args) {
			return await roleController.viewRole(_,args);
		}
	}
}