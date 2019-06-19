export default async function (model: any,args: any) {
  let object = await model.findOne({
    where: args
  });
  return object;
}