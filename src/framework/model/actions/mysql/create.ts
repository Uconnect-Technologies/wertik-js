let { ApolloError } = require("apollo-server");
import statusCodes from "./../../../helpers/statusCodes";

export default async function(model: any, args: any, name: any) {
  try {
    let create = await model.create(args);
    return create;
  } catch (e) {
    return new ApolloError(e.message, statusCodes.BAD_REQUEST.number, {});
  }
}
