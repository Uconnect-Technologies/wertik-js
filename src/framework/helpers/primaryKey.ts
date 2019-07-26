const {dialect} = process.env;

export default (dialect == "MONGO_DB") ? "_id": "id";
export let primaryKeyType = (dialect == "MONGO_DB") ? "String": "Int";