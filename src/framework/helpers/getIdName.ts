const {dialect} = process.env;

export default (dialect == "MONGO_DB") ? "_id": "id";