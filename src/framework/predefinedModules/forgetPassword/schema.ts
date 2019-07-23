import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import getIdName from "./../../../framework/helpers/getIdName"
import { getIdType } from "./../../../framework/helpers/getIdName"

export default `
	type ForgetPassword {
		${getIdName}: ${getIdType}
		email: String
		token: String
		successMessage: String
		successMessageType: String
		createdAt: String
		updatedAt: String
	}
	${getListByPaginationAndFiltersSchema("ForgetPassword")}
	input ForgetPasswordInput {
		${getIdName}: ${getIdType}
		email: String
		token: String
	}
`;