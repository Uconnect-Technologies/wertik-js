const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  createPermission(action: String): Permission
  deletePermission(id: Int,_id: String): Permission
  updatePermission(id: Int, action: String,_id: String): Permission
`;
