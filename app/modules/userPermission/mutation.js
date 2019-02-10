const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  createUserPermission(permission: ${relationSchemaType},user: ${relationSchemaType}): UserPermission
  deleteUserPermission(id: Int,_id: String): UserPermission
  updateUserPermission(id: Int, user: ${relationSchemaType},permission: ${relationSchemaType},_id: String): UserPermission
`;
