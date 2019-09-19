let {ApolloError} = require("apollo-server");
export const generateError = (e: Error,statusCode: Number = 404) => {
    return new ApolloError(e.message);
}