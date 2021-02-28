export default `
	scalar JSON
	scalar JSONObject

	input StringFilterInput {
		_eq: String
		_ne: String
		_like: String
		_notLike: String
		_iLike: String
		_notILike: String
		_startsWith: String
		_endsWith: String
		_substring: String
		_regexp: String
		_notRegexp: String
		_iRegexp: String
		_notIRegexp: String
		_or: StringFilterInput
		_and: StringFilterInput
	}
	input IntFilterInput {
		_eq: Int
		_gt: Int
		_gte: Int
		_lt: Int
		_lte: Int
		_ne: Int
		_between: [Int]
		_notBetween: [Int]
		_in: [Int]
		_notIn: [Int]
		_or: IntFilterInput
		_and: IntFilterInput
	}
	input DateFilterInput {
		_eq: String
		_gt: String
		_gte: String
		_in: [String!]
		_lt: String
		_lte: String
		_neq: String
		_nin: [String!]
	}
	input BooleanFilterInput {
		_eq: Boolean
		_ne: Boolean
	}

	type ModuleStats {
		total_count: Int
		total_created_this_month: Int
		total_created_this_week: Int
		total_created_last_7_days: Int
		total_created_today: Int
		total_created_last_month: Int
		total_created_last_90_days: Int
		total_created_last_year: Int
		total_created_this_year: Int
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
		hasMore: Boolean
	}
	input CacheOptionsInput {
		name: String
		expiry: Int
	}
`;
