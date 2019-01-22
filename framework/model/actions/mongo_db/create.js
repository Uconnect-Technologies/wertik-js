import randomString from "./../../../helpers/randomString.js";
export default async function (model, args, name) {
  const response = new model(args);
  response._id = randomString();
  console.log(response);
  await response.save();
  return response;
}