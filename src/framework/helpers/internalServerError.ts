let { ApolloError } = require("apollo-server");
export default function(e: any, code = 500) {
  return new ApolloError(e.message, code, {});
}
