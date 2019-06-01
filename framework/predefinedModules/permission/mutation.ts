import dynamic from "./../../../framework/dynamic/index.ts";
const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}

export default `
  ${dynamic.mutations.generateMutationsSchema("Permission")}
`;
