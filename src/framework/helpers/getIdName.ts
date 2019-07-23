const {dialect} = process.env;


console.log(process.env.mode)

export default (dialect == "MONGO_DB") ? "_id": "id";
export let getIdType = (dialect == "MONGO_DB") ? "String": "Int";