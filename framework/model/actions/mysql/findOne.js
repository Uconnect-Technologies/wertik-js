export default async function (model,args) {
  let object = await model.findOne({
    where: args
  });
  return object;
}