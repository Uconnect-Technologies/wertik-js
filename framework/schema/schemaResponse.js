import {GraphQLString} from "graphql";
export default {
  statusCode: {
    type: GraphQLString,
    resolve: (model) => model.statusCode
  },
  errorMessage: {
    type: GraphQLString,
    resolve: (model) => model.errorMessage
  },
  successMessage: {
    type: GraphQLString,
    resolve: (model) => model.successMessage
  },
  errorMessageType: {
    type: GraphQLString,
    resolve: (model) => model.errorMessageType
  },
  successMessageType: {
    type: GraphQLString,
    resolve: (model) => model.successMessageType
  },
}