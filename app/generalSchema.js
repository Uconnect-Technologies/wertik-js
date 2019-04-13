let pagination = `
	page: Int
	limit: Int
`;

let filter = `
	column: String
	operator: String
	value: String
`;
export default `
	input PaginationInput {
		${pagination}
	}
	input FilterInput {
		${filter}
	}
	type Pagination {
		${pagination}
	}
	type Filter {
		${filter}
	}
	type SuccessMessage {
		successMessage: String
	}
`;