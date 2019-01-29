const {DIALECT} = process.env;

export default (DIALECT == "MONGO_DB") ? "_id": "id";