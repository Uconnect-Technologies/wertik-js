"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
let relationSchemaType = "Int";
if (dialect == "MONGO_DB") {
    relationSchemaType = "String";
}
exports.default = `
	deleteUser(id: Int,_id: String): User
	changePassword(input: UserInput): User
	updateUser(input: UserInput): User
`;
//# sourceMappingURL=mutation.js.map