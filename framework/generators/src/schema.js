import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema.js"
const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}

export default `
	type a {
		_id: String
		id: Int
		s: String
			q: String
			
		game: game
		games: [games]
		
		created_by: User
		created_at: String
		updated_at: String
	}
	input aInput {
		_id: String
		id: Int
		s: String
			q: String
			
		created_by: User
		created_at: String
		updated_at: String
	}
`;