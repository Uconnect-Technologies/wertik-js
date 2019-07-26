import dynamic from "./../../../framework/dynamic/index";

export default `
	${dynamic.queries.generateQueriesSchema("User")}
	listUserPermissions(id: Int,_id: String): [Permission]
`;
