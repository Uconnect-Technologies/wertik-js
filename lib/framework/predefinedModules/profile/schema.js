"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const getIdName_2 = require("./../../../framework/helpers/getIdName");
exports.default = `
	type Profile {
		${getIdName_1.default}: ${getIdName_2.getIdType}
		user: User
		description: String
		successMessage: String
		successMessageType: String
		created_by: User
		createdAt: String
		updatedAt: String
	}
	${getListByPaginationAndFiltersSchema_1.default("Profile")}
	input ProfileInput {
		${getIdName_1.default}: ${getIdName_2.getIdType}
		user: ${getIdName_2.getIdType}
		description: String
	}
`;
//# sourceMappingURL=schema.js.map