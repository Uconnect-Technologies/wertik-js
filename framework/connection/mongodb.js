import mongoose from "mongoose";

const {
	MONGO_DB_USERNAME,
	MONGO_DB_PASSWORD,
	MONGO_DB_HOST,
	MONGO_DB_PORT,MONGO_DB_DATABASE
} = process.env;

mongoose.connect(`mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE}`);

export default mongoose;