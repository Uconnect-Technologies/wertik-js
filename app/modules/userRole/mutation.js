const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  createUserRole(user: ${relationSchemaType},role: ${relationSchemaType}): UserRole
  deleteUserRole(id: Int,_id: String): UserRole
  updateUserRole(id: Int, user: ${relationSchemaType}, role: ${relationSchemaType},_id: String): UserRole
`;
