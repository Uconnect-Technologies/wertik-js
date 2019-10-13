export default async function (model: any,id: any,requestedFields: any) {
  let attributes = {
    attributes: Object.keys(requestedFields)
  };
  
  if (requestedFields == "*") {
    delete attributes['attributes'];
  }
  
  const object = await model.findOne({
    where: {
      id: id,
    },
    ...attributes
  })
  return object;
}