"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const getIdName_2 = require("./../../../framework/helpers/getIdName");
exports.default = `
	type Permission {
		${getIdName_1.default}: ${getIdName_2.getIdType}
		action: String
		successMessage: String
		successMessageType: String
		created_by: User
		createdAt: String
		updatedAt: String
	}
	${getListByPaginationAndFiltersSchema_1.default("Permission")}
	input PermissionInput {
		${getIdName_1.default}: ${getIdName_2.getIdType}
		action: String
	}
`;
//# sourceMappingURL=schema.js.map