import {GraphQLString} from "graphql";
export default {
  errorMessage: {
    type: GraphQLString,
    resolve: (user) => user.errorMessage
  },
  successMessage: {
    type: GraphQLString,
    resolve: (user) => user.successMessage
  },
  errorMessageType: {
    type: GraphQLString,
    resolve: (user) => user.errorMessageType
  },
  successMessageType: {
    type: GraphQLString,
    resolve: (user) => user.successMessageType
  },
}