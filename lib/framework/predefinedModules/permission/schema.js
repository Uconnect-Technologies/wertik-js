"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
exports.default = `
	type Permission {
		_id: String
		id: Int
		action: String
		successMessage: String
		successMessageType: String
		created_by: User
		created_at: String
		updated_at: String
	}
	${getListByPaginationAndFiltersSchema_1.default("Permission")}
	input PermissionInput {
		_id: String
		id: Int
		action: String
	}
`;
//# sourceMappingURL=schema.js.map