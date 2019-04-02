import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema.js"
const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
	type UserPermission {
		_id: String
		id: Int
		user: User
		permission: Permission
		successMessage: String
		successMessageType: String
		created_at: String
		updated_at: String
	}
	${getListByPaginationAndFiltersSchema("UserPermission")}
	input UserPermissionInput {
		_id: String
		id: Int
		user: ${relationSchemaType}
		permission: ${relationSchemaType}
	}
`;