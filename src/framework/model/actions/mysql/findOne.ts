export default async function (model: any,args: any,requestedFields: any) {
  let object = await model.findOne({
    where: args,
    attributes: Object.keys(requestedFields)
  });
  return object;
}