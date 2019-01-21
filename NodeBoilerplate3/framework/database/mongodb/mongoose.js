import mongoose from "mongoose";
const mongo = `mongodb://<dbuser>:<dbpassword>@ds015690.mlab.com:15690/graphql`;
console.log(mongo);

mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose
    .connect(
      mongo,
      {
        keepAlive: 1,
        useNewUrlParser: true
      }
    )
    .then(() => console.log("Connected to mongodb successfully"))
    .catch(err => console.log(err));
  return mongoose.connection;
};
