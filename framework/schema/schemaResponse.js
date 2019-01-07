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
  id: {
    type: GraphQLString,
    resolve: (model) => model.id
  },
  created_at: {
    type: GraphQLString,
    resolve: (model) => model.created_at
  },
  updated_at: {
    type: GraphQLString,
    resolve: (model) => model.updated_at
  },
  deleted_at: {
    type: GraphQLString,
    resolve: (model) => model.deleted_at
  },
}