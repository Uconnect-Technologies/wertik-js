"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
	input PaginationInput {
		page: Int
		limit: Int
	}
	input FilterInput {
		column: String
		operator: String
		value: String
	}
	type Pagination {
		page: Int
		limit: Int
	}
	type Filter {
		column: String
		operator: String
		value: String
	}
`;
//# sourceMappingURL=generalSchema.js.map