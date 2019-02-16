const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  createPermission(input: PermissionInput): Permission
  deletePermission(input: PermissionInput): Permission
  updatePermission(input: PermissionInput): Permission
`;
