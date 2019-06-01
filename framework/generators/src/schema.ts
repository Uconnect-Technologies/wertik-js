import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema.ts"
const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}

export default `
	type game {
		_id: String
		id: Int
		name: String
			plays: Int
			
		user: [user]
		
		created_by: User
		created_at: String
		updated_at: String
	}
	input gameInput {
		_id: String
		id: Int
		name: String
			plays: Int
			
		created_by: User
		created_at: String
		updated_at: String
	}
`;