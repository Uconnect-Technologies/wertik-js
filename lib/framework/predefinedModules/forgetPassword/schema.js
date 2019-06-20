"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
exports.default = `
	type ForgetPassword {
		_id: String
		id: Int
		email: String
		token: String
		successMessage: String
		successMessageType: String
		created_at: String
		updated_at: String
	}
	${getListByPaginationAndFiltersSchema_1.default("ForgetPassword")}
	input ForgetPasswordInput {
		_id: String
		id: Int
		email: String
		token: String
	}
`;
//# sourceMappingURL=schema.js.map