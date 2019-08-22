import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey"
export let schema = `
	type Permission {
		${primaryKey}: ${primaryKeyType}
		name: String
		can: String
		cant: String
		created_by: User
	}
	input PermissionInput {
		${primaryKey}: ${primaryKeyType}
		name: String
		can: String
		cant: String
	}
`;
export let resolvers = {
	Permission: {
		
	},
}
export let validations = {};
export let fields = {
	name: "String",
	can: "String",
	cant: "String",
	created_by: primaryKeyType
};