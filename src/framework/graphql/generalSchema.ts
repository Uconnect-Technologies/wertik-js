export default `
	type ModuleStats {
		total_count: Int
		total_added_this_month: Int
		total_added_this_week: Int
		total_added_last_7_days: Int
		total_added_today: Int
		total_added_last_month: Int
		total_added_last_3_months: Int
		total_added_last_90_days: Int
		total_added_last_year: Int
		total_added_this_year: Int
	}
	type Sorting {
		column: String
		type: String
	}
	input SortingInput {
		column: String
		type: String
	}
	input PaginationInput {
		page: Int
		limit: Int
	}
	input FilterInput {
		column: String!
		operator: String!
		value: String!
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
	type PaginationProperties {
		total: Int
		pages: Int
		page: Int
		nextPage: Int
		previousPage: Int
	}
`;
