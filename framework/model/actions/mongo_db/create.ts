import randomString from "./../../../helpers/randomString";
export default async function (model, args, name) {
  const response = new model(args);
  response._id = randomString(14,"usdsgdgfoanefo");
  await response.save();
  return response;
}