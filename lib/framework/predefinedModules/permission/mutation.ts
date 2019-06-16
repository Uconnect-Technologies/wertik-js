import dynamic from "./../../../framework/dynamic/index";
const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}

export default `
  ${dynamic.mutations.generateMutationsSchema("Permission")}
`;
