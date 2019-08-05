export default async function (model: any, args: any, requestedFields: any) {
  let rest = {};
  if (typeof requestedFields == "object") {
    rest = {
      attributes: Object.keys(requestedFields)
    }
  } else {
    rest = {};
  }
  let object = await model.findOne({
    where: args,
    ...rest
  });
  return object;
}