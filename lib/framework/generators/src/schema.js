"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
let relationSchemaType = "Int";
if (dialect == "MONGO_DB") {
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
		createdAt: String
		updatedAt: String
	}
	input gameInput {
		_id: String
		id: Int
		name: String
			plays: Int
			
		created_by: User
		createdAt: String
		updatedAt: String
	}
`;
//# sourceMappingURL=schema.js.map