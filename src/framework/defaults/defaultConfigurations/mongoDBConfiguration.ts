import defaultConfiguration from "./defaultConfiguration";

let configuration = { ...defaultConfiguration };

configuration.database = {
  dbDialect: "mongodb",
  dbConnectionString: process.env.mongodbConnectionURI
};

export default configuration;
