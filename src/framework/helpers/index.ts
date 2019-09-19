let {ApolloError} = require("apollo-server");
export const generateError = (e: any,statusCode: Number = 404) => {
    return new ApolloError(e.message);
}