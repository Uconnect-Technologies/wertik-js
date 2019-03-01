import dynamic from "./../../../framework/dynamic/index.js";
const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}

export default `
  ${dynamic.mutations.generateMutationsSchema("Permission")}
`;
