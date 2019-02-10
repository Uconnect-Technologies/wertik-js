const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  createProfile(user: ${relationSchemaType}, description: String): Profile
  deleteProfile(id: Int,_id: String): Profile
  updateProfile(id: Int, description: String,_id: String): Profile
`;
