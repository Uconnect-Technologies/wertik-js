export default `
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
