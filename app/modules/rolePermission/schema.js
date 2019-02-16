const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
	type RolePermission {
		_id: String
		id: Int
		permission: Permission,
		role: Role
		successMessage: String
		successMessageType: String
		errors: [String]
		statusCode: String
		statusCodeNumber: Int
		created_at: String
		updated_at: String
	}
	input RolePermissionInput {
		_id: String
		id: Int
		permission: ${relationSchemaType}
		role: ${relationSchemaType}
	}
`;