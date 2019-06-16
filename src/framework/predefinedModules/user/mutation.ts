const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
	deleteUser(id: Int,_id: String): User
	changePassword(input: UserInput): User
	updateUser(input: UserInput): User
`;