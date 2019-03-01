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
`