import defaultConfiguration from "./defaultConfiguration";

let configuration = { ...defaultConfiguration };

configuration.database = {
  dbDialect: "mongodb",
  mongoDBURI: "mongodb://iksdatoo:pass123@ds027719.mlab.com:27719/graphql",
};

export default configuration;
