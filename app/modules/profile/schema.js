const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
	type Profile {
		_id: String
		id: Int
		user: User
		description: String
		successMessage: String
		successMessageType: String
		created_by: User
		created_at: String
		updated_at: String
	}
	input ProfileInput {
		_id: String
		id: Int
		user: ${relationSchemaType}
		description: String
	}
`;