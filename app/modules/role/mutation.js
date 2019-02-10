const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  createRole(name: String): Role
  deleteRole(id: Int, _id: String): Role
  updateRole(id: Int, name: String, _id: String): Role
`;
