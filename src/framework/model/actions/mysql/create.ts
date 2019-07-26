let { ApolloError } = require("apollo-server");
import statusCodes from "./../../../helpers/statusCodes";

export default async function (model: any,args: any,name: any) {
  try {
    let create = await model.create(args);
    create.successMessageType = "Created";
    create.successMessage = `${name} created successfully`;
    return create;
  } catch (e) {
    throw new ApolloError(e.message, statusCodes.BAD_REQUEST.number, {})
  }
}