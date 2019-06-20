import dynamic from "./../../../framework/dynamic/index";
const {dialect} = process.env;
let relationSchemaType = "Int";
if (dialect == "MONGO_DB") {
	relationSchemaType = "String";
}

export default `
  ${dynamic.mutations.generateMutationsSchema("Permission")}
`;
