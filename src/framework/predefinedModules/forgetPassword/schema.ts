import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey"

export default `
	type ForgetPassword {
		${primaryKey}: ${primaryKeyType}
		name: String
		email: String
		token: String
	}
	${getListByPaginationAndFiltersSchema("ForgetPassword")}
	input ForgetPasswordInput {
		${primaryKeyType}: ${primaryKeyType}
		email: String
		token: String
	}
`;