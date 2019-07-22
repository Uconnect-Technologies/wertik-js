const {dialect} = process.env;

export default (dialect == "MONGO_DB") ? "_id": "id";
export let getIdType = (dialect == "MONGO_DB") ? "String": "Int";