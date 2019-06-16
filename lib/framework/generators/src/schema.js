"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DIALECT } = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
    relationSchemaType = "String";
}
exports.default = `
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
//# sourceMappingURL=schema.js.map