"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const { DIALECT } = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
    relationSchemaType = "String";
}
exports.default = `
	type Profile {
		_id: String
		id: Int
		user: User
		description: String
		successMessage: String
		successMessageType: String
		created_by: User
		created_at: String
		updated_at: String
	}
	${getListByPaginationAndFiltersSchema_1.default("Profile")}
	input ProfileInput {
		_id: String
		id: Int
		user: ${relationSchemaType}
		description: String
	}
`;
//# sourceMappingURL=schema.js.map