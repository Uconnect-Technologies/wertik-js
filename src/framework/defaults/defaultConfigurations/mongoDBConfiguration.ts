import defaultConfiguration from "./defaultConfiguration";

let configuration = { ...defaultConfiguration };

configuration.database = {
  dbDialect: "mongodb",
  dbConnectionString: "mongodb://iksdatoo:pass123@ds057204.mlab.com:57204/graphql",
};

export default configuration;
