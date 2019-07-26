import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey from "./../../../framework/helpers/primaryKey"
import { primaryKeyType } from "./../../../framework/helpers/primaryKey"

export default `
	type Profile {
		${primaryKey}: ${primaryKeyType}
		user: User
		description: String
		successMessage: String
		successMessageType: String
		created_by: User
	}
	${getListByPaginationAndFiltersSchema("Profile")}
	input ProfileInput {
		${primaryKey}: ${primaryKeyType}
		user: ${primaryKeyType}
		description: String
	}
`;