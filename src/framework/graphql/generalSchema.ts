export default `
	input StringFilterSqlInput {
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
		_or: StringFilterSqlInput
		_and: StringFilterSqlInput
	}
	input IntFilterSqlInput {
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
		_or: IntFilterSqlInput
		_and: IntFilterSqlInput
	}
	input DateFilterSqlInput {
		_eq: String
		_gt: String
		_gte: String
		_in: [String!]
		_lt: String
		_lte: String
		_neq: String
		_nin: [String!]
	}
	input BooleanFilterSqlInput {
		_eq: Boolean
		_ne: Boolean
	}
	input StringFilterMongoDBInput {
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
		_or: StringFilterMongoDBInput
		_and: StringFilterMongoDBInput
	}
	input IntFilterMongoDBInput {
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
		_or: IntFilterMongoDBInput
		_and: IntFilterMongoDBInput
	}
	input DateFilterMongoDBInput {
		_eq: String
		_gt: String
		_gte: String
		_in: [String!]
		_lt: String
		_lte: String
		_neq: String
		_nin: [String!]
	}
	input BooleanFilterMongoDBInput {
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
	}
`;
