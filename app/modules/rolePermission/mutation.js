const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  createRolePermission(role: ${relationSchemaType},permission: ${relationSchemaType}): RolePermission
  deleteRolePermission(id: Int,_id: String): RolePermission
  updateRolePermission(id: Int, role: ${relationSchemaType},permission: ${relationSchemaType},_id: String): RolePermission
`;
