import dynamic from "./../../../framework/dynamic/index";

export default `
	${dynamic.mutations.generateMutationsSchema("User")}
	changePassword(input: UserInput): User
`;