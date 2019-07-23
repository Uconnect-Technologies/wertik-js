export default async function (model: any,id: any,requestedFields: any) {
  let object = {};
  object = await model.findOne({
    where: {
      id: id,
    },
    attributes: Object.keys(requestedFields)
  })
  return object;
}